const cacheName = "AdoptDogv4";
const _assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/bootstrap.min.css",
  "/images/dog_icon.svg",
  "/images/alert-dog.png",
  "/js/app.js",
  "/js/main.js",
  "/js/jquery.js",
  "/js/party.js",
  "/js/bootstrap.bundle.min.js",
];

self.addEventListener("install", (installEvent) => {
  const _app_shell = caches
    .open(cacheName)
    .then((cache) => cache.addAll(_assets));

  installEvent.waitUntil(_app_shell);

});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (!cacheName.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return (
        res ||
        fetch(fetchEvent.request).catch((error) =>
          console.log("Error en la peticion")
        )
      );
    })
  );
});
