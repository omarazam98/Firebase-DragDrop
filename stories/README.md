*STORYBOOK*
Most of these questions can be resolved by reading the docs. At https://storybook.js.org/
Take the tutorial at https://www.learnstorybook.com/react/en/get-started

**Basic Info**
***What is it?***
Storybook is a tool for helping develop components in React (Also other frameworks but we don't care about them).
Storybook provides a sandbox to develop and render components in isolation and to create renders of the different states of a component that can be shared to the team through source control.

***Why Do I use it?***
No more fiddling around with App.tsx.
Storybook allows you to test rendering components without starting our entire application.
Instead of placing a component in App.tsx, a scenario can be created as a story.
Stories are rendered on the storybook server and update in real time just like nodemon.

***Are these tests?***
No... and yes... and no

Stories do not replace tests. If a story fails, no flags will be thrown, no errors, no failed jenkins builds. This means that in the context of automation, stories are useless. Thus they cannot be the main source of testing an application.

Stories do function well as a sort of TDD, they allow us to codify examples of a application state, and see what it will look like in realtime during the development process. They function well to show off components, and force developers to create reusable modular components.

When a component is ready, stories can be converted to tests. Stories are a render of a specific state of our application. Taking that render and adding it as a snapshot test, is a low effort way of ensuring that we get failed tests, when a story changes.

**Usage**

***Running Storybook server***
To run the storybook server

    npm run storybook

The storybook will then be available at localhost:9009

***Writing a story***

Follow the tutorial at https://www.learnstorybook.com/react/en/get-started

**File structure**
storybook/<componentName>/index.js is where you should include stories for a particular component

storybook/index.js is where all stories that are rendered must be included. Import your component story from the above file and add it to the list of rendered stories

