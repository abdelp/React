# Configuring single-spa

**What does the single-spa config consist of?**

The single-spa root config consists of the following:

1. The root HTML file that is shared by all single-spa applications.
2. The JavaScript that calls [singleSpa.registerApplication()](https://single-spa.js.org/docs/api/#registerapplication).

**What does the root config exist only for?**

The root config exists only to start up the single-spa applications.

## Index.html file

## Registering applications

**Why you must register applications with single-spa?**

You must register applications with single-spa so it knows how and when to initiate, load, mount, and unmount each application.

**Where does registration most commonly occur?**

Registration most commonly occurs inside of the single-spa config but does not have to.

**What will happen with the hierarchy if an application if registered form within another application?**

Note that if an application is registered from within another application, no hierarchy will be maintained between the applications. The applications will be siblings and will be mounted and unmounted according to their own activity functions.

**How to register an application?**

In order to register an application, call the `registerApplication` function. Example:

```js
// single-spa-config.js
import { registerApplication, start } from 'single-spa';

// Simple usage
registerApplication(
  "app2",
  () => import("src/app2/main.js"),
  (location) => location.pathname.startsWith("/app2"),
  { some: "value" },
);

// Config with more expressive API
registerApplication({
  name: "app1",
  app: () => import("src/app1/main.js"),
  activeWhen: "/app1",
  customProps: {
    some: "value",
  },
});

start();
```

## Using arguments

### Application name

The first argument to `registerApplication` must be a string name.

### Loading Function or Application

The second argument to `registerApplication` must be either a function that returns a promise [loading function](https://single-spa.js.org/docs/configuration#loading-function) or the resolved Application.

**Application as second argument**

**What you can optionally use for the second argument?**

Optionally for the second argument you can use the resolved Application, consisting of an object with the lifecycle methods.

**What does using a resolved Application as the second argument allow?**

This allows you import the Application from another file or define applications inline in your single-spa-config. 

**Loading Function**

The second argument to `registerApplication` must be a function that returns a promise (or an "async function").

**How will the function be called when it's time to load for the first time?**

The function will be called with no arguments when it's time to load the application for the first time.

**How must the returned promise be resolved with?**

The returned promise must be resolved with the application.

**What's the most common implementation of a loading function?**

The most common implementation of a loading function is an import call: `() => import('/path/to/application.js')`

### Activity function

**What must the third argument to `registerApplication` be?**

The third argument to `registerApplication` must be a pure function, the function provided `window.location` as the first argument, and returns a truthy value whenever the application should be active.

**How must commonly the activity function determines if an application is active?**

Most commonly, the activity function determines if an application is active by looking at `window.location/` the first param.

**How is another way of looking at this?**

Another way of looking at this is that single-spa is a top-level router that has a lot of applications that have their own sub-router.

**What are the scenarios under single-spa will call each application's activity function?**

single-spa will call each application's activity function under the following scenarios:

* `hashchange` or `popstate` event
* `pushState` or `replaceState` is called
* `triggerAppChange` api is called on single-spa
* Whenever the `checkActivityFunctions` method is called

### Custom props


### Path prefix

## Calling singleSpa.start()

// TODO