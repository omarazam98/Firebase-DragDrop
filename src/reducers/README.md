## What is a reducer?
If we consider actions to be the interface, of how we can modify the redux store, we can consider reducers are the implementation.

Reducers are used to modify the state of the Redux store.
When actions are dispatched, they are passed through every reducer.
Switch statements within the reducers are used to determine how to modify state, based on the action recieved.

## Things to keep in mind.
Your reducer should be a pure function. It should not reference any external variables. It must determine a new state, based on the old redux state, and the dispatched action, and nothing else.

The default state of the reducer is where it's structure can be declared. It should be passed in as the default state argument in the reducer function.

## How to add a new Reducer.

1. Define your default reducer state.

    const default<reducer_name>ReducerState = <thedefaultstate>;

2. Create your reducer.

    export const <reducer_name>Reducer = (state = default<reducer_name>ReducerState, action) => {
      switch(action.type){
        // All action handlers go as cases here the cases return the new redux state
        case 'EXAMPLE_ACTION': 
        case default:
          return state;
      }
    }

3. Add the reducer to the src/store/createStore file in the combine reducer, and determine its field name

    import { <reducer_name> } from '<reducer_file>';
    // createStore initializes the redux store and determines what reducers are included under what name
    export const store = createStore(
        combineReducers({
          // This is where you declare the structure of the store
          // This objects keys determine the name of the field, and the value should be a reducer
          <redux_field_name>: <reducer_name>
        }),
        composeEnhancers(applyMiddleware(thunk)),
    );