import { addKeyToSearch, removeKeyFromSearch } from './url';

test('addKeyToSearch', () => {
  expect(addKeyToSearch('?hello', 'createModal')).toBe('?hello&createModal');
});

test('removeKeyFromSearch', () => {
  expect(removeKeyFromSearch('?hello&createModal', 'createModal')).toBe('?hello');
});
