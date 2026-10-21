// Stores every file on first visit so the game runs offline afterwards.
// When you update the game, change the version below (busyu-v2, v3, ...).
const CACHE = "busyu-v1";
const FILES = ["./", "index.html", "fonts.css", "matter.min.js", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request)));
});
