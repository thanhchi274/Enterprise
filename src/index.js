import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store/store';
import './assets/scss/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <Provider store={store}>
  <HashRouter basename="/Enterprise" >
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </HashRouter >
</Provider>,
  document.getElementById('root')
);
reportWebVitals();
