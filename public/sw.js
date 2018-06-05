/* add serviceworker code here 
   A servcieworker only listens to events and is refered to as 'self' 
   ie. self.addEventListener('eventname', (event) =>) {

   }

   you need to *install* the service worker, *activate* it and probably see that you can intercept *fetch*-requests
*/

self.addEventListener('install', (event) => {
    console.log('SW registering ');
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activting Service Worker ...');
    return self.clients.claim();
  });
  

self.addEventListener('fetch', (event) => {
    console.log('SW fetching', event);
    event.respondWith(fetch(event.request));
});