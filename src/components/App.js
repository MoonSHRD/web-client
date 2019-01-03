import React, { useState } from 'react';
import Login from './Login';

const App = () => {
  const [matrix, setMatrix] = useState({});

  if (!matrix.accessToken) {
    return <Login setMatrix={setMatrix} />;
  }

  return <pre>{JSON.stringify(matrix, null, 2)}</pre>;
};

export default App;
