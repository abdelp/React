# Overview

**What setup is recommended?**

It's recommended a setup that uses in-browser ES modules + import maps (or SystemJS to polyfill these if you need better browser support).

**What are the advantages?**

1. Common libraries are easy to manage, and are only downloaded once.
1. Sharing code / functions / variables is as easy as import/export, just like in a monolithic setup.
1. Lazy loading applications is easy, which enables you to speed up initial load times.
1. Each application (AKA microservice, AKA ES module) can be independently developed and deployed.
1. A great developer experience.

## Alternatives

## In-browser vs build-time modules

**What's an in-browser JavaScript module?**

An in-browser JavaScript module is when imports and exports are not compiled away by your build tool, but instead are resolved within the browser.

**What's a built-time module?**

A built-time module is supplied by your node_modules and compiled away before they touch the browser.

**What's the way to tell webpack and rollup to leave some dependencies untouched during the build?**

The way to tell webpack and rollup to leave some dependencies untouched during the build, so that they come from the browser, is vie [webpack externals]() and [rollup externals]().

Recommendations:

**Should each single-spa application be an in-browser JavaScript module?**

- [x] Yes
- [] No

**Should each large shared-dependency (ie, the react, vue, or angular libraries) also be an in-browser module?**

- [x] Yes
- [] No

**Everything else should be a build-time module?**

- [x] Yes
- [] No

## Import Maps

**What are Import Maps?**

[Import Maps]() are a browser specification for aliasing "import specifiers" to a URL.

## Module Federation

**What is Module Federation?**

[Module Federation]() is a webpack-specific technique for sharing [build-time modules]().

**What does Module Federation involve?**

It involves each microfrontend bundling all of its dependencies, even the shared ones.

**What will happen in the browser with Module Federation?**

In the browser, the first copy of the shared dependency will be downloaded, but subsequent microfrontends will reuse that shared dependency without downloading their copy of it.

## SystemJS

**What does SystemJS provide?**

SystemJS provides polyfill-like behaviour for import maps and in-browser modules.

**What do you need to set to compile your code to System.register format?**

To compile your code to System.register format, set webpack's [output.libraryTarget]() to `"system"`, or set rollup's [format]() to `"system"`.

**Where you can find System.register versions of shared dependencies like React, Vue, etc?**

You can find System.register versions of the libraries in [the esm-blunde project]().

## Lazy loading

**How do you use lazy loading in single-spa?**

If you use [single-spa loading functions](), you already have built-in lazy loading for your applications and parcels.

## Local development

## Build tools (Webpack / Rollup)

**Do we have to use a bundler?**

- [] Yes
- [x] No

## Utility modules (styleguide, API, etc)

**What is a "utility module"?**

A "utility module" is an in-browser JavaScript module that is not a single-spa application or parcel.

**What is the only purpose of a "utility module"?**

It's only purpose is to export functionality for other microfrontends to import.

## Cross microfrontend imports

**Can you import and export functions, components, logic, data, event emitters, and environment variables between your microfrontends that are in different git repos and JavaScript bundles?**

- [x] Yes
- [] No

**How many entry files should each microfrontend have?**

Each microfrontend should have a single [entry file]() that serves as the "public interface" that controls what is exposed outside of the microfrontend.

**What you have to do to make cross microfrontend imports possible?**

To make cross microfrontends imports possible, configure your bundler so that the microfrontends are treated as "externals".

**What does marking them as externals ensure?**

Marking them as externals ensures that they are treated as [in-browser modules]() instead of build-time modules.

```js
// Inside of the "entry file" for a utility module called @org-name/auth,
// expose your public interface that other microfrontends can access.
// Often this is within the main.js or main.single-spa.js file

export function useHasAccess(permission) {
  return loggedInUser.permissions.some((p) => p === permission);
}
```

```js
import { userHasAccess } from "@org-name/auth";

// Inside of a single-spa application, import and use a util function from a different microfrontend
const showLinkToInvoiceFeature = userHasAccess("invoicing");
```

```js
// In your webpack config, mark @org-name auth as a webpack external
module.exports = {
  externals: ["@org-name/auth"],

  // Alternatively, mark *all* org-name packages as externals
  // externals: [/^@org-name\/.+]
};
```

## Shared dependencies

**Why is not advisable to make everything a shared dependency?**

It is not advisable to make everything a shared dependency, because shared dependencies must be upgraded at once for every microfrontend that uses them.

**What are the two approaches to sharing dependencies?**

1. [In-browser modules with import maps]()
2. [Build-time modules with module federation]()

**What's the recommended approach?**

It's currently recommended only using import maps, although there's no objection to module federation.

## Sharing with Import Maps

**What you should use to share a dependency between microfrontends with [Import Maps]()?**

To share a dependency between microfrontends with [Import Maps](), you should use [webpack externals](), [rollup externals](), or similar.

**What does marking libraries as externals do?**

Marking libraries as external tells your bundler to not use the version in your node_modules, but rather to expect the library to exist as an in-browser module.

**What must be done to make a shared dependency available as in-browser modules?**

To make the shared dependencies available as in-browser modules, they must be present in your import map.

**What's a good way to manage the import maps?**

A good way of managing them is to create a repository called `shared-dependencies` that has a partial import map in it.

**What should you check in case a library doesn't publish its code in a suitable format for SystemJS consumption?**

In those cases, check [https://github.com/esm-bundle](https://github.com/esm-bundle) for a SystemJS version of those libraries.

**What's another option for finding suitable version of a library for your import map?**

Another option for finding a suitable version of a library for your import map is to use the JSPM CDN, which provides precompiled SystemJS versions of every package on npm (example: https://system-cdn.jspm.io/npm:@material-ui/core@4.11.3/index.js).

**How can you generate an import map for you shared dependency?**

You can generate an import map for your shared dependencies at https://generator.jspm.io/

## Deployment and Continuous Integration (CI)

// To check later

## Applications versus parcels versus utility modules

**Many route-based single-spa applications, very few single-spa parcels**

**How should you prefer to split microfrontends?**

Prefer splitting microfrontends by route, instead of by components within a route. The reason for this is that transitions between routes often involve destroying and recreating most UI state, which means your single-spa applications on different routes do not need to ever share UI state.

2. Move fixed navigation menus into their own single-spa applications. Implement their [activity functions]() to be active by default, only unmounting for the login page.

3. Create utility modules for your core component library / styleguide, for shared authentication / authorization code, and for global error handling.

4. If you are only using one framework, prefer framework components (i.e. React, Vue, and Angular components) over single-spa parcels. You should only create a single-spa parcel if you need it to work with multiple frameworks.

## Inter-app communication

### Functions, components, logic, and environment variables

**What's recommended to use to share functions, components, logic, and environment variables?**

It's recommended to use [cross microfrontend imports]() to share functions, components, logic, and environment variables.

## API data

### UI State

_If two microfrontends are frequently passing state between each other, consider merging them._

Under the rare circumstances where you do need to share UI state between single-spa applications, an event emitter may be used to do so.

## State management

