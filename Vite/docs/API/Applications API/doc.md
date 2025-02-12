## Applications API

**How does single-spa export its functions and variables?**

Single-spa exports named functions and variables rather than a single default export.

### registerApplication

**What's the most important API your too will use?**

`registerApplication` is the most important API your root will use.

**What is registerApplication used for?**

This function is used to register any application within single-spa.

**What will happen if an application is registered from within another application?**

If an application is registered from within another application, no hierarchy will be maintained between the applications.

**What are the two ways of registering an application?**

### Simple arguments

```js
singleSpa.registerApplication(
  "appName",
  () => System.import("appName"),
  (location) => location.pathname.startsWith("appName"),
);
```

### arguments

## start

**What will happen before `start` is called?**

Before `start` is called, applications will be loaded, but will never be bootstrapped, mounted or unmounted.

### arguments

**What is the `urlRerouteOnly` option for?**

useRerouteOnly if set to true, calls to `history.pushState()` and `history.replaceState()` will not trigger a single-spa reroute unless the client side route was changed.

## triggerAppChange

**What will triggerAppChange return?**

Returns a Promise that will resolve/reject when all apps have mounted/unmounted.

## navigateToUrl

**What is navigateToUrl used for?**

Use this utility function to easily perform url navigation between registered applications without needing to deal with `event.preventDefault()`, `pushState`, `triggerAppChange()`, etc.

## getMountedApps

// investigate what is it useful for

## getAppNames

// investigate what is it useful for

## getAppStatus

// investigate what is it useful for

## Handling LOAD_ERROR status to retry module

