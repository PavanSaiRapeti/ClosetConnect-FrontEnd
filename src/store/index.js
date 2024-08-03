import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers';



const makeStore = (context) => {
  
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'common', 'search', 'trade', 'item'],
  blacklist: ['user']
};

 const persistedReducer = persistReducer(persistConfig, rootReducer);
  const sagaMiddleware = createSagaMiddleware();
  let composeEnhancers = compose;

  if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

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