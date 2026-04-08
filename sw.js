const CACHE = 'reps-v53';
// Only cache static assets (images/icons) — never index.html
const STATIC = ['/icon-192.png', '/icon-512.png', '/img-leg-day.jpg', '/img-10-dumbbell-arms.jpg', '/img-cardio.jpg'];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC))); });
self.addEventListener('activate', e => { e.waitUntil((async () => { const keys = await caches.keys(); await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))); await self.clients.claim(); })()); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // index.html + HTML pages: always network-first (changes are immediately visible)
  if(url.pathname === '/' || url.pathname.endsWith('.html') || url.pathname.endsWith('.json')){
    e.respondWith(fetch(e.request).catch(() => caches.match('/index.html')));
    return;
  }
  // Static assets: cache-first (fast, works offline)
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
