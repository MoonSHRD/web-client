import { addKeyToSearch, removeKeyFromSearch } from './url';

test('addKeyToSearch', () => {
  expect(addKeyToSearch('?hello', 'createModal')).toBe('?createModal&hello');
});

test('removeKeyFromSearch', () => {
  expect(removeKeyFromSearch('?hello&createModal', 'createModal')).toBe('?hello');
});
