import { useContext, useState, useEffect } from 'react';
import sdk from 'matrix-js-sdk';
import debounce from 'fbjs/lib/debounceCore';
import MatrixClientContext from './MatrixClientContext';

const baseMatrixOptions = {
  baseUrl: 'https://13.59.234.201.xip.io',
};

export const useMatrix = options => {
  const [matrixClient, setMatrixClient] = useState(null);
  const [matrixRooms, setMatrixRooms] = useState({});

  useEffect(
    () => {
      const client = sdk.createClient({
        ...baseMatrixOptions,
        ...options,
      });

      client.startClient({ initialSyncLimit: 10 });

      const debouncedSetMatrixRooms = debounce(setMatrixRooms, 500);
      const handleUpdate = e => {
        if (e.getType().indexOf('m.room') === 0) {
          debouncedSetMatrixRooms(client.store.rooms);
        }
      };

      client.on('event', handleUpdate);

      setMatrixClient(client);

      return () => {
        client.removeListener('event', handleUpdate);
        client.stopClient();
      };
    },
    [options]
  );

  if (process.env.NODE_ENV !== 'production') {
    window.matrixClient = matrixClient;
  }

  return { matrixClient, matrixRooms };
};

export const usePromise = (fn, resolveCondition) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState();
  const [error, setError] = useState();

  const request = (...args) => {
    /*
    Using isValid guard, in order to prevent the cleanup warning.
    */
    let isValid = true;
    setLoading(true);

    fn(...args)
      .then(result => {
        if (!isValid) return;

        setData(result);
        setLastUpdated(Date.now());
      })
      .catch(err => {
        if (!isValid) return;

        setError(err);
      })
      .finally(() => {
        if (!isValid) return;

        setLoading(false);
      });

    /*
    When component will be unmounted, isValid will become false and state setter
    functions will not be envoked on unmounted component.
    */
    return () => {
      isValid = false;
    };
  };

  useEffect(request, resolveCondition);

  return {
    request,
    data,
    isLoading,
    lastUpdated,
    error,
  };
};

const defaultGroups = [];

export const useJoinedGroups = () => {
  const client = useContext(MatrixClientContext);
  const { data: groupsData } = usePromise(() => client.getJoinedGroups(), [client]);
  const groupIds = groupsData ? groupsData.groups : defaultGroups;

  // TODO: optimize N+1 requests
  const { data: summaryData } = usePromise(() => Promise.all(groupIds.map(id => client.getGroupSummary(id))), [
    groupIds,
  ]);

  const { data: roomsData } = usePromise(() => Promise.all(groupIds.map(id => client.getGroupRooms(id))), [groupIds]);

  return groupIds.map((id, index) => ({
    id,
    ...(summaryData && summaryData[index]),
    rooms: roomsData[index],
  }));
};
