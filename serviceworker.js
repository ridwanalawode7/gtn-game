const assets = [
  '/',
  '/css/style.css',
  '/js/script.js',
  '/css/slkscr-webfont.woff',
  'sw-register.js',
];

// self.addEventListener('install', (e) => {
//   caches.open('asstes').then((cache) => {
//     cache.addAll(assets);
//   });
// });

// Service Worker Installation
self.addEventListener('install', (event) => {
  // install the assets of my PWA
  event.waitUntil(
    caches.open('assets').then((cache) => {
      // cache.addAll(assets);
      const stack = [];
      assets.forEach((file) =>
        stack.push(
          cache
            .add(file)
            .catch((_) => console.error(`can't load ${file} to cache`)),
        ),
      );
      return Promise.all(stack);
    }),
  );
  // self.skipWaiting(); // activate the service worker immediately
});

// State while revalidate strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open('assets').then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      // We use the currently cached version if it's there
      return cachedResponse || fetchPromise; // cached or a network fetch
    }),
  );
});
