## What is a reducer?
If we consider actions to be the interface, of how we can modify the redux store, we can consider reducers are the implementation.

Reducers are used to modify the state of the Redux store.
When actions are dispatched, they are passed through every reducer.
Switch statements within the reducers are used to determine how to modify state, based on the action recieved.

## Things to keep in mind.
Your reducer should be a pure function. It should not reference any external variables. It must determine a new state, based on the old redux state, and the dispatched action, and nothing else.

The default state of the reducer is where it's structure can be declared. It should be passed in as the default state argument in the reducer function.