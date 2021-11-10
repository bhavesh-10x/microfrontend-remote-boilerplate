import { routerMiddleware, connectRouter } from 'connected-react-router';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import AllRootReducers from './reducers';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = function configureStore(initialState) {
  function createReducer(asyncReducers) {
    return combineReducers({
      router: connectRouter(history),
      ...AllRootReducers,
      ...asyncReducers
    });
  }
  const store = createStore(
    createReducer(initialState),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (prefix, asyncReducer) => {
    Object.keys(asyncReducer).forEach(key => {
      store.asyncReducers[`${prefix}_${key}`] = asyncReducer[key];
    });
    store.replaceReducer(createReducer(store.asyncReducers));
  };

  // Return the modified store
  return store;
};

const store = configureStore({});

export { store, history };
