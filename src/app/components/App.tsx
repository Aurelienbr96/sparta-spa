import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { Routes } from '../navigation';
import { store } from '../redux/store';

import '../i18n/config';

export function App() {
  return (
    <HelmetProvider>
      <Router>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    </HelmetProvider>
  );
}
