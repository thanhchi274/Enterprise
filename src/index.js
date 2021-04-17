import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store/store';
import './assets/scss/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
</Provider>,
  document.getElementById('root')
);
reportWebVitals();
