# Getting Started with Redux

## Installation

### Redux Toolkit

```sh
npm i @reduxjs/tookit
```

### Create a React Redux App

```sh
npx create-react-app my-app --template redux-typescript
```

### Basic Example

**How is the state of your app stored with Redux?**

The whole global state of your app is stored in an object tree inside a single store.

**What's the only way to change the state tree?**

The only way to change the state tree is to create an *action*, an object describing what happened, and *dispatch* it to the store.

**How do you specify how state gets updated?**

To specify how state gets updated in response to an action, you write pure *reducer* functions that calculate a new state based on the old state and action.

**What's a reducer?**

A reducer is a function that takes state value and an action object describing "what happened", and returns a new state value.

**What does a reducer takes as parames?**

A reducer takes as params:

* The current state value
* An action object describing "what happened"

Returns:

* A new state value.

**Reducer's function signature:**

```js
(state, action) => newState
```

**What should a Redux state contain?**

The Redux state should contain only:

* Plain JS objects
* Arrays
* Primitives.

**What's usually the root state value?**

The root state value is usually an object.

**What you should do if the state changes?**

It's important that you should not mutate the state object, but return a new object if the state changes.

**What's the only way to mutate the internal state?**

The only way to mutate the internal state is to dispatch an action.

**What can be done with actions?**

Actions can be:

* serialized
* logged
* stored

and later replayed.

[basic-example.js](./basic-example.js)

### Redux Toolkit Example

[redux-toolkit-example.js](./redux-toolkit-example.js)

### Should You Use Redux?

* You have reasonable amounts of data changing over time
* You need a single source of truth for your state
* You find that keeping all your state in a top-level component is no longer sufficient