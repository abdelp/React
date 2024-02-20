# Dependency Pre-Bundling

## The Why

1. CommonJS and UMD compatibility.

2. Performmance.

```
NOTE

Dependency pre-bundling only applies in development mode, and uses `esbuild` to convert dependencies to ESM. In production builds, `@rollup/plugin-commonjs` is used instead.
```
## Automatic Dependency Discovery

## Monorepos and Linked Dependencies

In a monorepo setup, a dependency may be a linked package from the same repo. Vite automatically detects dependencies that are not resolved from `node_modules` and treats the linked dep as source code.

However, this requires the linked dep to be exported as ESM. If not, you can add the dependency to `optimizedDeps.include` and `build.commonjsOptions.include` in your config.

```js
export default defineConfig({
  optimizeDeps: {
    include: ['linked-dep'],
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/]
    }
  }
})
```

When making changes to the linked dep, restart the dev server with the `--force` command line option for the changes to take effect.

## Customizing the Behavior

## Caching

### File System Cache

Vite caches the pre-bundled dependencies in `node_modules/.vite`. It determines whether it needs to re-run the pre-bundling step based on a few sources:

* 

## Browser Cache

Resolved dependency requests are strongly cached with HTTP headers `max-age=31536000,immutable` to improve page reload performance during dev. Once cached, these requests will never hit the dev server again. They are auto invalidated by the appended version query if a different version is installed (as reflected in your package manager lockfile). If you want to debug your dependencies by making local edits, you can:

1. Temporarily disable cache via the Network tab of your browser devtools;
2. Restart Vite dev server with the `--force` flag to re-bundle the deps;
3. Reload the page.