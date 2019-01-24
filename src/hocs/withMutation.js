import React, { useContext } from 'react';
import { commitMutation } from 'react-relay';
import RelayEnvironmentContext from 'components/RelayEnvironmentContext';

export default (key, getConfig) => Component => props => {
  const environment = useContext(RelayEnvironmentContext);

  const mutate = (...args) => {
    const config = getConfig(props, ...args);

    console.log(key, config);

    commitMutation(environment, {
      ...config,
      onCompleted: response => {
        console.log(key, response);

        if (config.onCompleted) {
          config.onCompleted(response);
        }
      },
      onError: err => {
        console.error(key, err);

        if (config.onError) {
          config.onError(err);
        }
      },
    });
  };

  return React.createElement(Component, {
    [key]: mutate,
    ...props,
  });
};
