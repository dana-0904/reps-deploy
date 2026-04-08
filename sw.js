const CACHE = 'reps-v52';
const STATIC = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png', '/img-leg-day.jpg', '/img-10-dumbbell-arms.jpg', '/img-cardio.jpg'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC))); });
self.addEventListener('activate', e => { e.waitUntil((async () => { const keys = await caches.keys(); await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))); await self.clients.claim(); })()); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/index.html')))); });
