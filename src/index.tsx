import React from 'react';
import { HashRouter } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';

import store from './services/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

// const basename =
//   process.env.NODE_ENV === 'production' ? '/stellar-burgers' : '/';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
