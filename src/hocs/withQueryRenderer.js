import React, { useContext } from 'react';
import QueryLookupRenderer from 'relay-query-lookup-renderer';

import RelayEnvironmentContext from 'components/RelayEnvironmentContext';
import QueryRendererError from 'components/molecules/QueryRendererError';
import Loading from 'components/molecules/Loading';

export default (query, config = {}) => Component => wrapperProps => {
  const environment = useContext(RelayEnvironmentContext);

  const { getVariables, ...queryProps } = config;
  const variables = getVariables ? getVariables(wrapperProps) : config.variables;

  // TODO: something wrong with lookup prop @alexesdev check please
  return (
    <QueryLookupRenderer
      lookup
      query={query}
      variables={variables}
      environment={environment}
      {...queryProps}
      render={({ error, retry, props }) => {
        if (error) {
          const ErrorComponent = config.error || QueryRendererError;
          return <ErrorComponent error={error} retry={retry} />;
        }

        if (props) {
          return <Component {...wrapperProps} {...props} />;
        }

        const LoadingComponent = config.loading || Loading;
        return <LoadingComponent />;
      }}
    />
  );
};
