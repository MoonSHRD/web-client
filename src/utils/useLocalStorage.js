import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [item, setValue] = useState(() => JSON.parse(window.localStorage.getItem(key)) || initialValue);

  const setItem = item => {
    setValue(item);
    window.localStorage.setItem(key, JSON.stringify(item));
  };

  return [item, setItem];
}
