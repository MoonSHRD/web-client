import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const proxyUrl = process.env.PROXY_URL || 'http://localhost:4000';

export default store => {
  function fetchQuery(operation, variables) {
    const { matrix } = store.getState();

    const headers = {
      'Content-Type': 'application/json',
    };

    if (matrix) {
      headers['X-Access-Token'] = matrix.accessToken;
      headers['X-User-Id'] = matrix.userId;
    }

    return fetch(`${proxyUrl}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => response.json());
  }

  const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });

  return environment;
};
