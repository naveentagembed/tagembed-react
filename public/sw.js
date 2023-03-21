let cacheData = "reactTheme";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/widget/static/js/bundle.js",
                "/widget/static/js/main.chunk.js",
                "/widget/static/js/vendors~main.chunk.js",
                "/widget/index.html",
                "/widget/"
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((result) => {
            if (result) {
                return result
            }
        })
    )

})