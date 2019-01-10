import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { SubscriptionClient } from 'subscriptions-transport-ws';

export default () => {
  function fetchQuery(operation, variables) {
    return fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => response.json());
  }

  const setupSubscription = (config, variables, cacheConfig, observer) => {
    const query = config.text;

    const client = new SubscriptionClient(process.env.SUBSCRIBE_ENDPOINT, { reconnect: true });

    client.request({ query, variables }).subscribe(observer);
  };

  const environment = new Environment({
    network: Network.create(fetchQuery, setupSubscription),
    store: new Store(new RecordSource()),
  });

  return environment;
};
