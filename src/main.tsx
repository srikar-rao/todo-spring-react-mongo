import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { initKeycloak } from './auth/keycloakService.ts';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
// Removed ReactDOM import as createRoot is imported from 'react-dom/client'


initKeycloak().then(authenticated => {
  if (authenticated) {
    createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
      </React.StrictMode>
    );
  } else {
    window.location.reload();
  }
}).catch(err => {
  console.error("Keycloak initialization failed", err);
});