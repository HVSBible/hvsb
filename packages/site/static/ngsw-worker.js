self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  self.registration.unregister().then(() => {
    console.log('Safety Worker - unregistered old Angular service worker');
  });
});
