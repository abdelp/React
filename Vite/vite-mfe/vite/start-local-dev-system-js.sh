yarn cache clean && \
npx concurrently \
  "npx vite build --config vite/systemjs.dev.ts --mode development" \
  "npx vite preview --config vite/systemjs.dev.ts --mode development" \