self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through strategy for now. 
  // Custom caching can be added later if needed.
  event.respondWith(fetch(event.request));
});
