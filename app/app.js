/**
 * @license
 * Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
/* eslint-env browser */

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    // Service worker isn't supported
    return;
  }

  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

    if (!isLocalhost && window.location.protocol !== 'https:') {
      console.warn('Service worker is supported in this browser but cannot ' +
        'work on a page that isn\'t accessed by HTTPS.');
      return;
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service-worker.js')
               .then(function() { console.log('Service Worker Registered'); 
             });
    }
}

(function() {
  'use strict';

  registerServiceWorker();
  
  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    count: 0,
    storeOne: 0,
    storeTwo: 0,
    storeThree: 0,
    storeFour: 0,
    storeFive: 0,
  };
  
  app.storeCost = {
    storeOne: 15,
    storeTwo: 50,
    storeThree: 100,
    storeFour: 200,
    storeFive: 1000
  }

  app.updateGameState = function () {
    setInterval(function () {
      app.updateScore();
      document.getElementById("scoreCounter").innerHTML = Math.floor(app.count);
      document.getElementById("storeOneCounter").innerHTML = app.basicStores;
    }, 350)
  }
  
  app.updateScore = function () {
    app.count = app.count + (app.storeOne * .3) + (app.storeTwo * .5) + (app.storeThree * 1) + (app.storeFour * 1.2) + (app.storeFive * 2.5);
  }
  
  app.increment = function () {
    document.getElementById("scoreCounter").innerHTML = app.count;
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.nodeName === 'BUTTON') {
        alert(e.id);
    }
  }
  
  app.incrementStores = function (e) {
    // 
    // if (app.count < 15) {
    //   alert("You can't afford this sry");
    // } else {
    //   app.count = app.count - 15;
    //   app.basicStores++;
    // }

    // console.log("Button clicked, id "+this.id+", text"+this.innerHTML);
    // document.getElementById("bStoreCounter").innerHTML = app.basicStores;
  }
  
  //Adding store increment 
  $('increment, #store-1, #store-2, #store-3, #store-4, #store-5').on('click', function (e) {
     app.increment(e);  
  })
  // document.getElementById('store-1').addEventListener('click', function(e) {
  //   app.incrementStores(e);
  // });
  
  //Run turn cycle
  app.updateGameState();
})();


