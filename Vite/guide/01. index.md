# Getting Started

## Overview

It consists of two major parts:

* A dev server that provides [rich feature enhancements]() over [native ES modules](), for example extremely fast [Hot Module Replacement (HMR)]().

* A build command that bundles your code with [Rollup](), pre-configured to output highly optimized static assets for production.

Support for frameworks or integration with other tools is possible through [Plugins](). 

## Browser Support

During development, Vite sets [esnext]() [as the transform target]().

For the production build, by default Vite targets browsers that support [native ES Modules](), [native ESM dynamic import](), and [import.meta](). Legacy browsers can be supported via the official [@vitejs/plugin-legacy]().

## Scaffolding Your First Vite Project

```
Compatibility Note
Vite requires Node.js version 18+. 20+.
```

```bash
yarn create vite

# with app name
yarn create vite my-vue-app --template vue
```

See [create-vite]() for more supported templates.

## Community Templates

[community maintained templates]()

For a template at `https://github.com/user/project`, you can try it out online using `https://github.stackblitz.com/user/project` (adding `.stackblitz` after `github` to the URL of the project).

You can also use a tool like [degit]() to scaffold your project with one of the templates.

```sh
npx degit user/project#main my-project
cd my-project

yarn
yarn run dev
```

## `index.html` and Project Root

In a Vite project, `index.html` is front-and-central instead of being tucked away inside `public`. During development Vite is a server, and `index.html` is the entry point to your application.

* Vite treats `index.html` as source code and part of the module graph.

* It resolves `<script type="module" src="...">` that references your JavaScript source code.

* Even inline `<script type="module">` and CSS referenced via `<link href>` also enjoy Vite-specific features.

* URLs inside `index.html` are automatically rebased so there's no need for special `%PUBLIC_URL%` placeholders.

Vite has the concept of a "root directory", you will see it referenced as `<root>`.

Absolute URLs in your source code will be resolved using the project root as base.

Vite is also capable of handling dependencies that resolve to out-of-root file system locations.

Vite also supports [multi-page apps]() with multiple `.html` entry points.

## Command Line Interface

## Community

[Discord](https://chat.vitejs.dev/)
[GitHub Discussions](https://github.com/vitejs/vite/discussions)