import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css';
import '../styles/tailwind.css';
import './index.css';
import 'styles/globals.css';
import { wrapper, store, persistor } from '../store';
import Loading from '@/components/Loading';
import useRouteChange from '@/components/Hooks/useRouteChange';

function MyApp({ Component, pageProps }) {
  const isRouteChanging = useRouteChange();

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <PersistGate persistor={store.__PERSISTOR} loading={<Loading />}>
          { <Component {...pageProps} />}
        </PersistGate>
      )}
    </ReactReduxContext.Consumer>
  );
}

export default wrapper.withRedux(MyApp);