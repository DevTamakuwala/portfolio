import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
} else {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
}
