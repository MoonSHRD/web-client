import React, { useContext } from 'react';
import QueryLookupRenderer from 'relay-query-lookup-renderer';
import RelayEnvironmentContext from 'components/RelayEnvironmentContext';
import QueryRendererError from 'components/molecules/QueryRendererError';
import Loading from 'components/molecules/Loading';

export default (query, config = {}) => Component => wrapperProps => {
  const environment = useContext(RelayEnvironmentContext);

  const { getVariables } = config;
  const variables = getVariables ? getVariables(wrapperProps) : config.variables;

  return (
    <QueryLookupRenderer
      query={query}
      variables={variables}
      environment={environment}
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
