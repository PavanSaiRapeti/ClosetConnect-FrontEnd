import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers';

const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const isServer = typeof window === 'undefined';
  const isBrowser = typeof window !== "undefined";
  const composeEnhancers = isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','item','auth']
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  if (!isServer) {
    store.__PERSISTOR = persistStore(store);
  }

  return store;
};

const wrapper = createWrapper(makeStore, { debug: true });
export { wrapper };