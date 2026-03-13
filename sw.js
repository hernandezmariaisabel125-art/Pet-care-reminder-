const CACHE_NAME = "pet care reminder v1";

const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/app.html",
  "/store.html",
  "/felinos.html",
  "/caninos.html",
  "/styles.css",
  "/app.js",
  "/manifest.json"
];

/* INSTALACIÓN */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

/* ACTIVACIÓN */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

/* FETCH – MODO OFFLINE */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});