import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers';

// const sagaMiddleware = createSagaMiddleware();

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth']
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const isBrowser = typeof window !== "undefined";
// const composeEnhancers = isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const makeStore = () => {
//   const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
//   store.sagaTask = sagaMiddleware.run(rootSaga);
//   return store;
// };

// const store = makeStore();
// const persistor = persistStore(store);

// export { store, persistor };
// export const wrapper = createWrapper(makeStore);




const makeStore = () => {
  let store;

  const sagaMiddleware = createSagaMiddleware();

  const isClient = typeof window !== "undefined";

const isBrowser = typeof window !== "undefined";
const composeEnhancers = isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  if (isClient) {
    const { persistStore } = require("redux-persist");

    //NOTE: We create store without initialState as we shall implement initial states in our individual reducers.
    store = createStore(
      persistedReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);
    store.sagaTask.toPromise().catch(error => {
      console.log(error);
      throw error;
    });
    store.__PERSISTOR = persistStore(store);

  } else {

    //NOTE: We create store without initialState as we shall implement initial states in our individual reducers.
    store = createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware)
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);
    store.sagaTask.toPromise().catch(error => {
      console.log(error);
      throw error;
    });
  }

  return store;
};

const wrapper = createWrapper(makeStore);
export { wrapper };