## What the hell is this?
The api folder contains all interactions between the client and the firebase database.

**No other file should ever have any references to firebase**

## Why?
This allows us to decouple the way we display data Components, and how we store and modify client state Reducers, Actions, Store from where we store and fetch data from API.