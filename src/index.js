//setting up Provider

import React from 'react';
import './index.css';
import App from './App';
import { store } from "./store";
import { Provider } from 'react-redux';
import ReactDOM  from 'react-dom';


// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);
