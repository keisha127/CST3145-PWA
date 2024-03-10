var cacheName = "lessonstore-v1";
var cacheFiles = [
   "index.html",
   "style.css",
   "images/icon.png",
   "images/icon32.png",
   "images/art.png",
   "images/ballet.png",
   "images/chinese.png",
   "images/cooking.png",
   "images/football.png",
   "images/history.png",
   "images/math.png",
   "images/music.png",
   "images/programing.png",
   "images/science.png",
   "lessons.js"
];


// self.addEventListener("install", function(e) {
//    console.log("[Service Worker] Install");
//    e.waitUntil(
//       caches.open(cacheName).then(function(cache) {
//          console.log("[Service Worker] Caching files");
//          return cache.addAll(cacheFiles);
//         }) );
//     });

// self.addEventListener('fetch', function (e) {
//     e.respondWith( 
//         // check if the cache has the file
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resource: ' + e.request.url);
//             // 'r' is the matching file if it exists in the cache
//             return r
//         }) );
//     });


// self.addEventListener("fetch", function(e) {
//     e.respondWith(
//         caches.match(e.request).then(function (cachedFile) {
//             //if the file is in the cache, retrieve it from there
//             if (cachedFile) {
//                 console.log("[Service Worker] Resource ferched from the cache for: "
//                 + e.request.url);
//             } else { //if the file isn't in the cache, download it
//                 return fetch(e.request).then(function (response) {
//                     return caches.open(cacheName).then(function (cache) {
//                         // add new file to cache
//                         cache.put(e.request, response.clone());
                        
//                         console.log("[Service Worker] Resource fetched and saved in the cache for: "
//                         + e.request.url);

//                         return response;
//                     });
//                 });
//             }
//         })
//     );
// });


self.addEventListener("fetch", async function (e) {
   e.respondWith(
       (async function () {
           const cachedFile = await caches.match(e.request);

           // If the file is in the cache, retrieve it from there
           if (cachedFile) {
               console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
               return cachedFile; // Return the cached response
           } else { // If the file isn't in the cache, download it
               const response = await fetch(e.request);

               // Clone the response before using it
               const responseClone = response.clone();

               await caches.open(cacheName).then(async function (cache) {
                   // Add the new file to the cache
                   await cache.put(e.request, responseClone);

                   console.log("[Service Worker] Resource fetched and saved in the cache for: " + e.request.url);
               });

               return response; // Return the original response
           }
       })()
   );
});

