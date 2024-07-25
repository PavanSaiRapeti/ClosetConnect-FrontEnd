import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css';
import '../styles/tailwind.css';
import './index.css';
import 'styles/globals.css';
import { wrapper, store, persistor } from '../store';

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);