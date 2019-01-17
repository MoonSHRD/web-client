import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { SubscriptionClient } from 'subscriptions-transport-ws';

export default store => {
  function fetchQuery(operation, variables) {
    const { matrix } = store.getState();

    return fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': matrix.accessToken,
        'X-User-Id': matrix.userId,
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => response.json());
  }

  const setupSubscription = (request, variables, cacheConfig, observer) => {
    const query = request.text;
    const { matrix } = store.getState();

    const client = new SubscriptionClient(process.env.SUBSCRIBE_ENDPOINT, {
      reconnect: false,
      connectionParams: matrix,
    });

    const sub = client.request({ query, variables }).subscribe({
      next(data) {
        return observer.onNext(data);
      },
      error(err) {
        return observer.onError(err);
      },
      complete() {
        return observer.onCompleted();
      },
    });

    return {
      dispose: () => sub.unsubscribe(),
    };
  };

  const environment = new Environment({
    network: Network.create(fetchQuery, setupSubscription),
    store: new Store(new RecordSource()),
  });

  return environment;
};
