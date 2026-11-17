// Nebula Sky a déménagé (studio-nebulis.github.io/nebula-sky-app/). Ce service worker remplace l'ancien :
// il efface les caches de Nebula Sky (et seulement eux : d'autres applis partagent cette adresse),
// se désinscrit, puis envoie les fenêtres ouvertes vers la nouvelle adresse.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith('nebulasky') || k.startsWith('ciel') || k.startsWith('cosmyra')) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate('https://studio-nebulis.github.io/nebula-sky-app/');
})()));
