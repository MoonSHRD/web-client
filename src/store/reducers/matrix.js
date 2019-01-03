export default (state = null, action) => {
  if (action.type === 'UPDATE_MATRIX') {
    return action.value;
  }

  return state;
};
