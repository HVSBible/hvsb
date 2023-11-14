self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  self.registration.unregister().then(() => {
    console.info('Safety Worker - unregistered old Angular service worker');
  });
});
