# Layout Definition

**What's a layout?**

A layout is a combination of HTMLElements, routes, and [single-spa applications]().

**How is the layout defined?**

The layout is defined statically in your [root config]() to handle your top level routes and dom elements.

**Should single-spa-layout be used outside of the root config?**

- [ ] Yes
- [x] No

**What should handle the layout?**

A UI framework (React, Angular, Vue) should handle layouts within the applications.

**How may you define layouts?**

You may define layouts as either HTML templates or JSON objects.

**Who is defining JSON layouts preferred for?**

Defining in JSON is supported for organizations who prefer storing their layout definitions in a database instead of code.

**Do both, HTML and JSON layouts have the same feature set?**

- [x] Yes
- [ ] No

**Where is it preferred and encouraged to store layouts by default?**

Storing layouts in code is generally preferred and encouraged by default

## HTML Layouts

**Where you may define your HTML layouts?**

You may define HTML layouts either within your root config's index.html file, or within a javascript string that is parsed as HTML.

**Where is it encouraged to define the layout?**

It's generally encouraged defining the layout within your root config's index.html file.

**How to defined a layout within your index.html file?**

To define a layout within your index.html file:
1. create a `<template id="single-spa-layout">` element that contains your layout.
1. within the template, add a `<single-spa-router>` element, along with any routes, applications, and dom elements.

**How are HTMLElements defined in the layout?**

HTMLElements defined in your layout are static - there is no way to forcibly re-render or change them.

```ejs
<!-- index.ejs -->
<html>
  <head>
    <template>
      <single-spa-router>
        <div class="main-content">
          <route path="settings">
            <application name="settings"></application>
          </route>
        </div>
      </single-spa-router>
    </template>
  </head>
</html>
```

```js
// With a properly configured bundler, you can import the html as a string from another file
import layout from './microfrontends-layout.html';

const routes = constructRoutes(layout);
```

### JSON Layouts

You may define your layouts as JSON, including routes, applications, and arbitrary dom elements.

```js
const routes = constructRoutes({
  routes: [{
    type: 'route',
    path: 'settings',
    routes: [{ type: 'application', name: 'settings' }],
  }],
})
```

## Layout Elements

**What is a layout element?**

A layout element is an HTMLElement or JSON object that represents either a dom node, route, or application.

`<template>`

**When is template used?**

The [template element]() is only used when defining the layout as HTML.

**What is the purpose of the template element?**

Its purpose is to prevent its content from being displayed by the browser, since the layout definition should not be visible to user.

`<single-spa-router>`

**Where is the single-spa-router required?**

The `single-spa-router` element is required as the top level container of your layout.

### Attributes

* `mode` (optional): A string that must be `hash` or `history` that defaults to `history`.

**What does the mode attribute indicate?**

This indicates whether the routes should be matched against the Location [pathname]() or [hash]().

* `base` (optional): A string URL prefix that will be considered when matching route paths.
* `disableWarnings` (optional): A boolean that turns of single-spa-layout's console warnings when the elements provided are incorrect.
* `containerEl` (optional): A string [CSS Selector]() or [HTMLElement]() that is used as the container for all single-spa dom elements. Defaults to `body`.

`<route>`

**What is it the route element used for?**

The `route` element is used to control which applications and dom elements are shown for a top-level URL route.

**What may the route element contain?**

It may contain HTMLElements, applications, or other routes.

**Is the route path an exact match?**

Note that the route path is a URL prefix, not an exact match.

### Attributes

* `routes` (required): An array of children elements that will be displayed when the route is active.
* `path` (optional): A path that will be matched against the browser's URL.

**Are leading an trailing `/` characters necessary?**

- [ ] True
- [x] False

Leading and trailing `/` characters are unnecessary and are automatically applied.

**How 