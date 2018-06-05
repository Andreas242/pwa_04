/* add serviceworker code here 
   A servcieworker only listens to events and is refered to as 'self' 
   ie. self.addEventListener('eventname', (event) =>) {

   }

   you need to *install* the service worker, *activate* it and probably see that you can intercept *fetch*-requests
*/

var CACHE_NAME = 'static';
var urlsToCache = [
  '/',
  '/css/pwa1.css',
  '/js/app.js',
  '/images/pwa-reliable.png',
  'https://fonts.googleapis.com/css?family=Roboto:400,700' 
];

self.addEventListener('install', (event) => {
    console.log('SW registering ');
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activting Service Worker ...');
    return self.clients.claim();
  });
  

self.addEventListener('fetch', (event) => {
    console.log('SW fetching', event);
    event.respondWith(
        caches.match(event.request)
          .then((response) => {
              if(response) {
            return response;
              } else {
                  return fetch(event.request);
              }
          })
      );
});