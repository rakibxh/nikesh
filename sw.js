// Niqesh Service Worker — go.niqesh.com
const CACHE_NAME = 'niqesh-cache-v2';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './logo-header.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Never cache backend API calls — always go to network, let app.js handle offline queueing
  if (req.method !== 'GET') return;

  // Network-first: always serve the freshest file when online, so a new deploy
  // (new colors, new fonts, new features) is visible immediately on next load.
  // Cache is only used as a fallback when the network is unavailable (offline).
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && req.url.startsWith(self.location.origin)) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
