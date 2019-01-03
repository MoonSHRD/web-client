import React from 'react';
import Login from './Login';
import useLocalStorage from '../utils/useLocalStorage';

const App = () => {
  const [matrix, setMatrix] = useLocalStorage('matrix', {});

  if (!matrix.accessToken) {
    return <Login setMatrix={setMatrix} />;
  }

  return <pre>{JSON.stringify(matrix, null, 2)}</pre>;
};

export default App;
