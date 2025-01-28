# Layout Engine

## Introduction

**What does layout engine provide?**

The layout engine provides a routing API that controls your top level routes, applications, and dom elements.

**What does using single-spa-layout make easier to accomplish?**

Using single-spa-layout makes it easier to accomplish the following:

* DOM placement and ordering of applications.
* Loading UIs when applications are downloaded.
* Default routes for Not Found / 404 pages.
* Transitions between routes (implementation pending).
* Server side rendering of single-spa applications.
* Error pages.

**What does the layout engine perform in the browser?**

In the browser, the layout engine performs two major tasks:

1. Generate [single-spa registration config]() from an HTML Element and/or JSON object.
2. Listen to [routing events]() to ensure that all DOM elements are laid out correctly before the single-spa applications are mounted.

**What does the layout engine perform on the server?**

On the server, the layout engine performs two tasks:

1. Construct a [server layout object]() from an HTML template.
1. Send an HTML document (HTTP response headers and body) to the browser, based on the server layout object and current route.

## Installation

**Where do you need to install the layout engine?**

You only need to install the layout engine into your [root config]() (not in any other application).

```sh
npm install --save single-spa-layout

# or
yarn add single-spa-layout
```

## Browser/NodeJS support

`single-spa-layout` works in all browsers supported by single-spa.

all NodeJS versions that support ESM are supported.

## Requirements

* You must use single-spa@>=5.4.0
* You may not provide custom `domElementGetter` functions for any of your single-spa applications, as those override the configuration within single-spa-layout

## Basic usage

In your root html file, add a `<template>` element to the head.

**What should the root html file contain?**

It should have a `<single-spa-router>` element that contains `<route>` elements, `<application>` elements, and any other dom elements.

```js
import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

const routes = constructRoutes(document.querySelector('#single-spa-layout'));
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
start();
```