import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {persistStore} from 'redux-persist'
import rootReducer from './root.reducer'
import rootSaga from './root.saga'
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
  ));
  sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)
export default {store, persistStore}