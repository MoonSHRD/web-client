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
  const store = createStore(
    persistedReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const persistor = persistStore(store);

  return { store, persistor };
};
