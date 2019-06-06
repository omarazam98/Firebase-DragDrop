## What is the store?
The redux store is where client side state is ...well stored. 
The store can be modified through reducers.
And portions of the store can be mapped to the props of components

## What goes in the store folder
The only file needed in the store folder is the createStore file.
This is used to declare the reducers that are included, and the overall structure, as well as middleware (thunk).

## How do I add a reducer to the store?
Every time you go to add a reducer, the reducer must be added to the combine reducers method in: 
```
export const store = createStore(
    combineReducers({
      // This is where you declare the structure of the store
      // This objects keys determine the name of the field, and the value should be a reducer
      // <redux_field_name>: <reducer_name>
    }),
```

