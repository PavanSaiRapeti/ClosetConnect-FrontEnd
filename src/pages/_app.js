import React, { useEffect } from 'react';
import { ReactReduxContext, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '../styles/globals.css';
import '../styles/tailwind.css';
import './index.css';
import 'styles/globals.css';
import { wrapper, store, persistor } from '../store';
import Loading from '@/components/Loading';
import useRouteChange from '@/components/Hooks/useRouteChange';
import { setPageLoading } from 'store/actions/commonAction';

function MyApp({ Component, pageProps }) {
  const isRouteChanging = useRouteChange();
  const dispatch = useDispatch();

  useEffect(() => {
    if(isRouteChanging) {
      dispatch(setPageLoading(true));
    }
  }, [isRouteChanging, dispatch]);

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          { <Component {...pageProps} />}
        </PersistGate>
      )}
    </ReactReduxContext.Consumer>
  );
}

export default wrapper.withRedux(MyApp);