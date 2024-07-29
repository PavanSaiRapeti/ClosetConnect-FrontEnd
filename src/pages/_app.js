import React from 'react';
import {  ReactReduxContext } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css';
import '../styles/tailwind.css';
import './index.css';
import 'styles/globals.css';
import { wrapper, store, persistor } from '../store';

function MyApp({ Component, pageProps }) {

  return (
    <ReactReduxContext.Consumer>
    {({ store }) => (
      <PersistGate
        persistor={store.__PERSISTOR}
        loading={<div>Loading</div>}
      >
        <Component {...pageProps} />
      </PersistGate>
    )}
  </ReactReduxContext.Consumer>
  );
}

export default wrapper.withRedux(MyApp);