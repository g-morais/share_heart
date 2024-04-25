// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        cache.add(offlineFallbackPage);
        cache.add('css/offline.css'); // Pré-cache do arquivo de estilo
      })
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/css'))) {
    event.respondWith((async () => {
      try {
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(event.request);

        if (cachedResp) {
          return cachedResp;
        }

        const networkResp = await fetch(event.request);
        if (networkResp.ok && event.request.method === 'GET' && event.request.headers.get('accept').includes('text/css')) {
          await cache.put(event.request, networkResp.clone());
        }
        return networkResp;
      } catch (error) {
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
