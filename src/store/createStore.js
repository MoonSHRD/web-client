import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import matrix from './reducers/matrix';

const persistConfig = {
  key: 'moonshard',
  storage,
};

export default initialState => {
  const rootReducer = combineReducers({
    matrix,
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  // eslint-disable-next-line no-underscore-dangle
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(persistedReducer, initialState, devTools);
  const persistor = persistStore(store);

  return { store, persistor };
};
