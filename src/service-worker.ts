/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  NetworkOnly,
  CacheFirst,
} from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith("/_")) {
      return false;
    }

    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    console.log(true);

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Customization
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

registerRoute(
  ({ url }) =>
    url.origin === "https://63d5dae0dc3c55baf42d8585.mockapi.io" &&
    url.pathname === "/api/scope",
  new StaleWhileRevalidate({
    cacheName: "scopes-api-response",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({ maxEntries: 1 }), // Will cache maximum 1 requests.
    ],
  }),
  "GET"
);

const bgSyncPlugin = new BackgroundSyncPlugin("scopes-queue", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  ({ url }) =>
    url.origin === "https://63d5dae0dc3c55baf42d8585.mockapi.io" &&
    url.pathname.startsWith("/api/scope/") &&
    url.pathname.includes("requirements/"),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "PUT"
);

// const FALLBACK_HTML = "/static/js/772.456e458d.chunk.js	";
// const CACHE_NAME = "offline-fallback";

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML))
//   );
// });

// const fallbackPlugin = {
//   handlerDidError: async () => {
//     const fallbackResponse = await caches.match(FALLBACK_HTML, {
//       cacheName: CACHE_NAME,
//     });
//     return fallbackResponse;
//   },
// };

// registerRoute(
//   ({ url }) => url.origin === "https://63d5dae0dc3c55baf42d8585.mockapi.io",
//   new StaleWhileRevalidate({ plugins: [fallbackPlugin] })
// );
