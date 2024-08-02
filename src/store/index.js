import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'common', 'search', 'user', 'trade', 'item']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  store.__PERSISTOR = persistStore(store);
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper(makeStore);
const store = makeStore();
const persistor = store.__PERSISTOR;

export { wrapper, store, persistor };