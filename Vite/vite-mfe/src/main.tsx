import { StrictMode } from "react";
import "./index.css";
import App from "@/App";
import singleSpaReact from "single-spa-react";
// import singleSpaCss from "single-spa-css";
import React from "react";
import ReactDOMClient from "react-dom/client";

declare global {
  interface Window {
    __IN_SINGLE_SPA__?: string;
  }
}

if (window.__IN_SINGLE_SPA__) {
  // eslint-disable-next-line
  (window as any).__webpack_public_path__ = window.__IN_SINGLE_SPA__;
}

// const cssLifecycles = singleSpaCss({
//   cssUrls: ["http://localhost:5173/dist/vite-mfe.css"],
// });

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: () => (
    <StrictMode>
      <App />
    </StrictMode>
  ),
  domElementGetter: () => {
    const element = window?.document?.getElementById("root");
    if (!element) throw new Error("micro-frontend-wrapper element not found");

    return element;
  },
  errorBoundary(err) {
    // Customize the root error boundary for your microfrontend here.
    return <div>An error occurred: {err.message}</div>;
  },
});

export const bootstrap = [lifecycles.bootstrap];

export const mount = [lifecycles.mount];

export const unmount = [lifecycles.unmount];
