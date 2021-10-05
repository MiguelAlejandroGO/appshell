const nameCache = "Elephnats";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/bootstrap.min.css",
  "/js/app.js",
  "/js/main.js",
  "/js/jquery.js",
  "/js/bootstrap.bundle.min.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(nameCache).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request);
      })
    )
  })
;

