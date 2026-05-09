// sw.js

const CACHE_NAME = "sezr-matematik-v10";

const FILES_TO_CACHE = [
"./",
"./index.html",
"./favicon.png",
"./favicon.ico",
"./preview.jpg",
"./profil.jpg",
"./math-bg.jpg"
];

self.addEventListener("install", function (event) {

event.waitUntil(

caches.open(CACHE_NAME).then(function (cache) {

return cache.addAll(FILES_TO_CACHE);

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

caches.match(event.request).then(function (cachedResponse) {

if (cachedResponse) {

return cachedResponse;

}

return fetch(event.request);

})

);

});
