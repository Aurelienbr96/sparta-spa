import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Routes } from '../navigation';
import { persistor, store } from '../redux/store';

import '../i18n/config';
import { getEnv } from '@app/modules/common/utils/env.utils';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';

const QueryParser = ({ children }: { children: any }) => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const referalCode = queryParams.get('referalCode');

  useEffect(() => {
    console.log(referalCode);
  }, [referalCode]);
  return children;
};

export function App() {
  return (
    <HelmetProvider>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={getEnv('VITE_GOOGLE_CLIENT_ID')}>
          <Router>
            <Provider store={store}>
              <QueryParser>
                <Routes />
              </QueryParser>
            </Provider>
          </Router>
        </GoogleOAuthProvider>
      </PersistGate>
    </HelmetProvider>
  );
}
