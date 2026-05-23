const CACHE = 'lingora-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && e.request.url.startsWith(self.location.origin)) {
            cache.put(e.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    )
  );
});
