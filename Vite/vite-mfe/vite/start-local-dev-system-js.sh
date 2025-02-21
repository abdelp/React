yarn cache clean && \
npx concurrently \
  "npx vite build --config vite/systemjs.dev.ts" \
  "npx vite preview --config vite/systemjs.dev.ts" \