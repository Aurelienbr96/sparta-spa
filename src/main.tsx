import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/components/App';
import './app/assets/style.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
