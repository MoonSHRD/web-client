import { useState, useEffect } from 'react';
import sdk from 'matrix-js-sdk';

const baseMatrixOptions = {
  baseUrl: 'http://13.59.234.201.xip.io',
};

// eslint-disable-next-line import/prefer-default-export
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

      const handleUpdate = e => {
        if (e.getType().indexOf('m.room') === 0) {
          setMatrixRooms(client.store.rooms);
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
