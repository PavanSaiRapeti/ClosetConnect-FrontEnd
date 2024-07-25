import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isBrowser = typeof window !== "undefined";
const composeEnhancers = isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const makeStore = () => {
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const store = makeStore();
const persistor = persistStore(store);

export { store, persistor };
export const wrapper = createWrapper(makeStore);