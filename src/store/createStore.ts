import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { matchesReducer } from '../reducers/matches';

// Compose allows us to use both thunk and the redux devtools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// createStore initializes the redux store and determines what reducers are included under what name
export const store = createStore(
    combineReducers({
      matches: matchesReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
);
