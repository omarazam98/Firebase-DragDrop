import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Compose allows us to use both thunk and the redux devtools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// createStore initializes the redux store and determines what reducers are included under what name
export const store = createStore(
    combineReducers({
      // This is where you declare the structure of the store
      // This objects keys determine the name of the field, and the value should be a reducer
      // <redux_field_name>: <reducer_name>
    }),
    composeEnhancers(applyMiddleware(thunk)),
);
