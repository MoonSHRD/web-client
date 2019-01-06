import qs from 'query-string';
import { remove, set } from 'unchanged';

export const removeKeyFromSearch = (search, key) => `?${qs.stringify(remove(key, qs.parse(search)))}`;

export const addKeyToSearch = (search, key) => `?${qs.stringify(set(key, null, qs.parse(search)))}`;
