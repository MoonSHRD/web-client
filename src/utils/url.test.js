import { addKeyToSearch, removeKeyFromSearch } from './url';

test('addKeyToSearch', () => {
  expect(addKeyToSearch('?hello', 'createModal')).toBe('?hello&createModal');
});

test('addKeyToSearch', () => {
  expect(addKeyToSearch('?hello', 'createModal', { id: 10 })).toBe('?hello&createModal=%7B%22id%22%3A10%7D');
});

test('removeKeyFromSearch', () => {
  expect(removeKeyFromSearch('?hello&createModal', 'createModal')).toBe('?hello');
});
