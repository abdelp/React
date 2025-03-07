# Building single-spa applications

**What's the difference between a single-spa registered application and a normal SPA?**

A single-spa registered application is everything that a normal SPA is, except that it doesn't have an HTML page.

**In a single-spa world, your SPA contains many registered applications, where each has its own framework?**

- [x] Yes
- [ ] No

**Do registered applications have their own client-side routing and their own frameworks/libraries?**

- [ ] Yes
- [ ] No

**Do SPAs have full freedom to do whatever they want, whenever they are mounted?**

- [ ] Yes
- [ ] No

**What does the concept of being mounted refer to?**

The concept of being mounted refers to whether a registered application is putting content on the DOM or not.

**What does determine if a registered application is mounted?**

What determines if a registered application is mounted is its [activity function]().

**How should a registered application should remain when not mounted?**

Whenever a registered application is not mounted, it should remain completely dormant until mounted.

## Creating a registered application

## Registered application lifecycle

**What are the `lifecycles` of a registered application?**

During the course of a single-spa page, registered applications are:

* loaded
* bootstrapped (initialized)
* mounted
* unmounted
* unloaded

**What's a lifecycle function?**

A lifecycle function is a function or array of functions that single-spa will call on a registered application.

**How does single-spa call lifecycle functions?**

single-spa calls these lifecycle functions finding specific named exports from the registered application's main file.

Notes:

* Implementing `bootstrap`, `mount`, and `unmount` is required. But implementing `unload` is options.
* Each lifecycle function must either return a `Promise` or be an `async function`.
* If an array of functions is exported (instead of just one function), the functions will be called one-after-the-other, waiting for the resolution of the one function's promise before calling the next.
* If a single-spa is not started, applications will be loaded, but will not be bootstrapped, mounted or unmounted.

## Lifecycle props

**How are lifecycle functions called with?**

Lifecycle functions are called with a `props` argument, which is an object with some guaranteed information and additional custom information.

```js
function bootstrap(props) {
  const {
    name,        // The name of the application
    singleSpa,   // The singleSpa instance
    mountParcel, // Function for manually mounting
    customProps, // Additional custom information
  } = props;     // Props are given to every lifecycle
  return Promise.resolve();
}
```

#### Built-in props

**Which props are each lifecycle function guaranteed to be called with?*

Each lifecycle function si guaranteed to be called with the following props:

* `name`: The string name that was registered to single-spa.
* `singleSpa`: A reference to teh singleSpa instance, itself.

**What is the singleSpa prop intended for?**

This is intended to allow applications and helper libraries to call singleSpa APIs without having to import it. This is useful where there are multiple webpack configs that are not set up to ensure that only one instance of singleSpa is loaded.
* `mountParcel`: The [mountParcel function]()

#### Custom props

**Can you specify optional custom props?**

Yes, you may optionally specify custom props to be passed to an application.

**What's the structure of the customProps?**

The custom props are an object, and you can provide either the object or a function that returns the object.

**What are custom prop functions called with?**

Custom prop functions are called with the application name and current window.location as arguments.

```js
// root-config.js
singleSpa.registerApplication({
  name: "app1",
  activeWhen,
  app,
  customProps: { authToken: "123" },
});

singleSpa.registerApplication({
  name: "app1",
  activeWhen,
  app,
  customProps: (name, location) => ({ authToken: "123" }),
})
```

```js
// app1.js
export function mount(props) {
  // do something with the common authToken in app1
  console.log(props.authToken);
  return reactLifecycles.mount(props);
}
```

**What does customProps default to when not provided?**

Note that when no customProps are provided during registration, `props.customProps` defaults to an empty object.

## Lifecycle helpers

## Load

**What does lazy load register applications refer to?**

When registered applications are being lazily loaded, this refers to when the code for a registered application is fetched from the server and executed.

**When will the lazy load happen?**

This will happen once the registered application's activity function returns a truthy value for the first time.

**When is it considered to do things?**

It is considered best practice to do as little as possible / nothing at all during `load`, but instead to wait until the bootstrap lifecycle function to do anything.

**What you can do if you need to put something during load?**

If you need to do anything during `load`, simply put the code into a registered applications's main entry point, but not inside of an exported function. E.g.:

```js
console.log("The registered application has been loaded!");

export async function bootstrapp(props) {...}
export async function mount(props) {...}
export async function unmount(props) {...}
```

## Bootstrap

**When will boostrap lifecycle will be called?**

This lifecycle function will be called once, right before the registered application is mounted for the first time.

```js
export function bootstrap(props) {
  return Promise.resolve().then(() => {
    // One-time initialization code goes here
    console.log("bootstrapped!");
  });
}
```

## Mount

**When will mount lifecycle will be called?**

This lifecycle function will be called whenever the registered application is not mounted, but its activity function returns a truthy value.

**When called, what this function should look at?**

When called, this function should look at the URL to determine the active route and then create DOM elements, DOM event listeners, etc.

**Will any subsequent routing events (such a `haschange` and `popstate`) trigger more calls to `mount`?**

No, any subsequent routing events will not trigger more calls to `mount`, but instead should be handled by the application itself.

```js
export function mount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI rendering here
    console.log("mounted!");
  });
};
```

## Unmount

**When will this lifecycle be called?**

This lifecycle function will be called whenever the registered application is mounted, but its activity function returns a falsy value.

**What should do this lifecycle when called?**

When called, this function should clean up all DOM elements, DOM event listeners, leaked memory, globals, observable subscriptions, etc. that were created at any point when the registered application was mounted.

```js
export function unmount(props) {
  return Promise.resolve().then(() => {
    // Do framework UI unrendering here
    console.log("unmounted!");
  });
}
```

## Unload

**Is the `unload` lifecycle an optionally implemented lifecycle function?**

- [x] Yes
- [ ] No

**When will this lifecycle be called?**

It will be called whenever an application should be `unloaded`. This will not ever happen unless someone calls the [unloadApplication]() API.

**What will happen if a registered application does not implement the unload lifecycle?**

If a registered application does not implement the unload lifecycle, then it assumed that unloading the app is a no-op.

**What's the purpose of the `unload` lifecycle?**

The purpose of the `unload` lifecycle is to perform logic right before a single-spa application is unloaded.

**What will happen when the application is unloaded?**

Once the application is unloaded, the application status will be NOT_LOADED and the application will be re-bootstrapped.

```js
export function unload(props) {
  return Promise.resolve().then(() => {
    //Hot-reloading implementation goes here
    console.log("unloaded!");
  });
}
```

## Timeouts

**What do registered applications obey by default regarding timeouts?**

By default, registered application obey the [global timeout configuration](), but can override that behaviour for their specific application.

**How can registered application override the global timeout configuration?**

This is done by exporting a `timeouts` object from the main entry point of the registered application. E.g.:

```js
// app1.js

export function bootstrap(props) {...}
export function mount(props) {...}
export function unmount(props) {...}

export const timeouts = {
  bootstrap: {
    millis: 5000,
    dieOnTimeout: true,
    warningMillis: 2500
  },
  mount: {
    millis: 5000,
    dieOnTimeout: false,
    warningMillis: 2500,
  },
  unmout: {
    millis: 5000,
    dieOnTimeout: false,
    warningMillis: 2500,
  },
  unload: {
    millis: 5000,
    dieOnTimeout: false,
    warningMillis: 2500,
  }
}
```

**What does `millis` refer to?**

Note that `millis` refers to the number of milliseconds for the final console warning.

**What does `warningMillis` refer to?**

`warningMillis` refers to the number of milliseconds at which a warning will be printed to the console (on an interval) leading up to the final console warning.

## Transition between applications

**What should you probably do if you find yourself wanting to add transitions as applications are mounted and unmounted?**

If you find yourself wanting to add transitions as applications are mounted an unmounted, then you'll probably want to tie into the `bootstrap`, `mount`, and `unmount` lifecycle methods.

**Can transitions for pages within a mounted application be handled entirely by the application itself?**

- [x] Yes
- [ ] No