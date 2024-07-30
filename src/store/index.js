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
    whitelist: ['auth','common','search','user','trade','item']
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

    const { persistStore } = require("redux-persist");

    //NOTE: We create store without initialState as we shall implement initial states in our individual reducers.
    const store = createStore(
      persistedReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  if (!isServer) {
    store.__PERSISTOR = persistStore(store, null, () => {
      // Ensure the HYDRATE action is dispatched with a valid payload
      if (context) {
        store.dispatch({
          type: '__NEXT_REDUX_WRAPPER_HYDRATE__',
          payload: context,
        });
      }
    });
  }

  return store;
};

const wrapper = createWrapper(makeStore);
export { wrapper };