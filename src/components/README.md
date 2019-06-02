## What are components?
Components are reusable, independent pieces of user interface.

They are a core concept in react, so if this is news to you check out the docs at:
https://reactjs.org/docs/components-and-props.html 

## How do we use components?
Components can be completely independent vanilla react components. In that case data is passed to them by their parent with props, and is modified locally or by their children using this.state. These are generally called presentational components, and have no concept of redux.

However if components to interact with data from either Redux, or the database they do so in two ways.

1. Receiving data from redux through mapStateToProps
2. Dispatching action to redux through mapDispatchToProps

Components that either need to receive data from redux or dispatch actions to redux need to be connected to the redux store. This is done as follows.

**If any of this is confusing this resource is quite good https://blog.logrocket.com/react-redux-connect-when-and-how-to-use-it-f2a1edab2013/**

For this example assume that this component has been called as a decendant of <Provider> 
We have a redux store that has this structure describing a garage:

  {
    cars: [
      {},
      {},
      {}
    ],
    open: false
  }

And an action creator that looks like this

  const toggleDoor = () => {
    return {
      type: 'TOGGLE_DOOR',
    }
  }

The component would then look like this

  import React, { Component } from 'react';
  import { connect } from 'react-redux';
  import { changeName } from '../actions/fileThatHasThisCreatorInIt'

  // This class should be exported as a named export to be used in testing.
  // However as explained at the end of this example this export will not be the one used in source code
  export class SomeComponent extends Component {
    constructor(props){
      super(props)

      // if you are unfamiliar with binding check this out https://reactjs.org/docs/handling-events.html
      this.openCloseGarage = this.openCloseGarage.bind(this);
    }

    openCloseGarage() {
      // toggleGarageDoor is available as a prop, because we have used mapDispatchToProps seen below
      this.props.toggleGarageDoor();
    }

    render() {
      return (
        <div>
          <button onClick={this.openCloseGarage}>
            // garageOpen is available as a prop beause we provided it through mapStateToProps seen below
            {this.props.garageOpen}
          </button>
        </div>
      )
    }

    // This is where the redux specific details are added

    // mapStateToProps is used to subscribe to data from the redux store.
    // It allows data from the store to be accessed as a prop in the component
    // The first variable is the redux store state, and the second are the props that are provided by the component constructor (Normal props not mapped to redux state)

    const mapStateToProps = (reduxState, currentProps) => {
      return {
        // this is where the prop garageOpen is mapped to the 'open' field of theh state of the redux store
        garageOpen: state.open,
      }
    }

    // mapDispatchToProps is used to gain access to dispatching actions as a component prop
    // The first variable is the store.dispatch command, and the second are the props that are providd by the component constructor (Normal props not mapped to redux state)

    const mapDispatchToProps = (dispatch, currentProps) => {
      return {
        // this is where the prop toggleGarageDoor is mapped to the dispatching of the action toggleDoor
        // For this one ensure that you are declaring an inline function that calls dispatch with the action creator as the argument
        toggleGarageDoor: () => { dispatch(toggleDoor()) }
      }
    }

    // Finally the functions that were defined above need to be connected to the component.
    // Ensure that this connected component is what is exported as default and used in the source code.
    // However it is useful to export the unconnected component as a named export for testing

    connect(mapStateToProps, mapDispatchToProps)(SomeComponent)

  }