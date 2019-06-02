## What are selectors?

Selectors are used for parsing particular data from our redux state. 

Eg. if you have a list of people in your redux store. You can use a selector to only select all those above the age of 18, or a selector to provide all the people, but only the name and age field, ignoring email, marital status, etc.

## Keep in mind

Selectors do not determine what data the client has access to. They are simply used to "select" the data that we want to provide a component from the redux store. **All data stored in the redux store is accessible to the client**.