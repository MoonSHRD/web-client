export default (state = null, action) => {
  if (action.type === 'UPDATE_MATRIX') {
    return action.value;
  }

  if (action.type === 'LOGOUT') {
    return null;
  }

  return state;
};
