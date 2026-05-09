const CACHE_NAME = "sezr-matematik-v14";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.json",
  "./favicon.png",
  "./favicon.ico",
  "./preview.jpg",
  "./profil.jpg",
  "./math-bg.jpg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE).catch(function () {
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(function (networkResponse) {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseClone).catch(function(){});
        });
        return networkResponse;
      })
      .catch(function () {
        return caches.match(event.request).then(function (cachedResponse) {
          if (cachedResponse) return cachedResponse;

          if (event.request.mode === "navigate") {
            return caches.match("./offline.html");
          }
        });
      })
  );
});
