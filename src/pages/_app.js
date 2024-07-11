import { Provider } from 'react-redux';
import { wrapper } from '../store/index';
import { applyMiddleware, createStore } from 'redux';
import reduxSaga from 'redux-saga';
import rootSaga from 'store/sagas/rootSaga';
import rootReducer from 'store/reducers';
import '../styles/globals.css';
import '../styles/tailwind.css';
import './index.css';
import 'styles/globals.css';

const store = createStore(rootReducer, applyMiddleware(reduxSaga(rootSaga)));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);