const CACHE_NAME = 'juegos-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './data/database.json'
];

// Evento de instalación: Guarda los archivos esenciales en la memoria del celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de intercepción (fetch): Permite que la app cargue incluso sin internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo de la caché si existe, si no, lo busca en internet
        return response || fetch(event.request);
      })
  );
});