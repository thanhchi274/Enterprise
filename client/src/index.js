import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store/store';
import './assets/scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </BrowserRouter>
</Provider>,
  document.getElementById('root')
);
reportWebVitals();
