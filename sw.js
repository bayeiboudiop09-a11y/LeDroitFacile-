/* LeDroitFacile SN : accès hors ligne */
var V="ldf-v22",CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);
var font=u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com";
if(u.origin!==location.origin&&!font)return;
if(r.mode==="navigate"){e.respondWith(fetch(r).then(function(x){var c=x.clone();caches.open(V).then(function(h){h.put("./index.html",c)});return x}).catch(function(){return caches.match("./index.html").then(function(m){return m||caches.match("./")})}));return}
e.respondWith(caches.match(r).then(function(m){var n=fetch(r).then(function(x){if(x&&(x.ok||x.type==="opaque")){var c=x.clone();caches.open(V).then(function(h){h.put(r,c)})}return x}).catch(function(){return m});return m||n}))});
