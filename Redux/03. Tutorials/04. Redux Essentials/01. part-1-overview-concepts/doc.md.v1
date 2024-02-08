# Redux Essentials, Part 1: Redux Overview and Concepts

# Introduction

# Terminology

**Actions**

An **action** is a plain JavaScript object that has a `type` field. **You can think of an action as an event that describes something that happened in the application**.

**How are action name is usually named?**

We usually write that type string like `"domain/eventName`, where the first part is the feature or category that this action belongs to, and the second part is the specific thing that happened. E.g.: `"todos/todoAdded"`.

**Where is additional action put?**

An action object can have other fields with additional information about whatt happened. By convention, we put that information in a field called `payload`.

**Typical action object:**

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

**Action Creators**

An **action creator** is a function that creates and returns an action object. We typically use these so we don't have to write the action objec by hand every time:

```js
const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}
```

**Reducers**

A **reducer** is a function that receives the current `state` and an `action` object, decides how to update the state if necessary, and returns the new state: `(state, action) => newState`. **You can think of a reducer as an event listener which handles events based on the received action (event) type.**


Reducers specific rules:

* They should only calculate the new state value based on the `state` and `action` arguments
* They are not allowed to modify the existing `state`. Instead, they must make *immutable updates*, by copying the existing `state` and making changes to the copied values
* They must not do any asynchronous logic, calculate random values, or cause other "side effects"

**Store**

**Dispatch**

**Selectors**

## Redux Application Data Flow


