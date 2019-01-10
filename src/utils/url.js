import qs from 'query-string';
import { remove, set } from 'unchanged';

const stringifyOptions = { sort: false };

export const removeKeyFromSearch = (search, key) => {
  console.log(qs.parse(search));
  return `?${qs.stringify(remove(key, qs.parse(search)), stringifyOptions)}`;
};

export const addKeyToSearch = (search, key, params = null) =>
  `?${qs.stringify(set(key, params && JSON.stringify(params), qs.parse(search)), stringifyOptions)}`;
