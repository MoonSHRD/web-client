import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const QueryRendererError = ({ error, retry }) => (
  <div>
    <div>Что-то пошло не так</div>
    {error.toString()}
    <Button onClick={retry}>Попробовать ещё раз</Button>
  </div>
);

QueryRendererError.propTypes = {
  error: PropTypes.object.isRequired,
  retry: PropTypes.func.isRequired,
};

export default QueryRendererError;
