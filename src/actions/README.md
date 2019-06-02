## What are actions?
Actions are payloads of data that can be sent to the store. They define all the data manipulations that can be made to the redux store.

Actions are dispatched using:
  store.dispatch(<action>);

This sends the action object to each of the reducers which contain logic that determines how store data should change based on the action.

I find it helpful to think of actions as the interface of the store. In this analogy the reducer functions as the implementation of the actions.

## Anatomy of an action.
Actions are objects that have one mandatory field "type". Type is a string that identifies the type of action that it is. In addition to type, an action can have 0 or more data fields, titled at your discretion.

{
  type: 'ACTION_NAME',
  any_name1: {},
  any_name2: 'random_string',
}

## Action creator functions
Action creator functions wrap a function around the creation of action objects. These allow for conditional logic to be included into actions, and allow the programmer to avoid working with the type strings, which are succeptible to typos

**Using action creator functions instead of just making an action object when dispatching can be very powerful, and has very little drawback. Thus it is highly recomended.**

## Example actions
We have a simple store that has one variable count. We want to make three different actions.

1. Decrease count by one
Object

    const decreaseCount = {
      type: 'DECREASE_COUNT',
    }

Action Creator
    const decreaseCount = () => {
      return {
        type: 'DECREASE_COUNT'
      }
    }

 In this example we see that the creator doesn't provide much, however it should be used to have a uniform action dispatching procedure. As will be seen in the next examples that it will become necessary.

2. Set the count to a specific number

Object
    const setCount9 = {
      type: 'SET_COUNT',
      count: 9,
    }

Action Creator
    const setCount = (count) => {
      return {
        type: 'SET_COUNT',
        count: count,
      }
    }

In this example we see the advantage of action creators, dispatching the action without a creator would require an action object to be created each time. This requires knowledge of the structure of the action, and would rely on exact spelling of the action, without help from the compiler.

3. Increase count by a specific number less than 10, or if no number is provided 1

Object
    const increaseCount1 = {
      type: 'INCREASE_COUNT',
      amount: 1,
    }

Action Creator
    const increaseCount = (amount=0) => {
      if ( amount > 10 ) {
        amount = 10;
      }
      return {
        type: 'INCREASE_COUNT',
        amount: amount,
      }
    }

In this example we see more advantages of the creator. In this case, we have conditional logic. First we allow for default value to be set, if no amount is provided. Then we check the value of the amount to ensure that it is valid. Finally we create an action after applying this conditional logic. Without creators this would not be possible, and would have to be handled by the developer dispatching the action.