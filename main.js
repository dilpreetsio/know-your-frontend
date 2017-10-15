var reactSelector = '[data-reactroot], [data-reactid]';
var angularSelector = '[ng-app], [ng-model],[ng-controller],[ng-version],[ng-binding]';
var emberSelector = '.ember-application';
var vueSelector = '#detect-vue';

function injectCheckVue() {
  var injectCode = '(' + function() {
    if([...document.querySelectorAll("*")].some(n => n.__vue__)) {
      var el = document.createElement("span");
      el.setAttribute("id", "detect-vue");
      document.body.appendChild(el);
    }
  } + ')();';

  var script = document.createElement('script');
  script.textContent = injectCode;
  (document.head||document.documentElement).appendChild(script);
  script.remove();
}

function cleanUp() {
  el = document.getElementById("detect-vue");
  el.remove();
}

function checkFE() {
  injectCheckVue();
  var frontend = '';
  if (document.querySelector(reactSelector) || (window.require && window.require('React'))) {
    frontend = 'react';
  } else if(document.querySelector(angularSelector)) {
    frontend = 'angular';
  } else if(document.querySelector(emberSelector)) {
    frontend = 'ember';
  } else if(document.querySelector(vueSelector)) {
    frontend = 'vue';
  } else {
    frontend = 'none';
  }
  chrome.runtime.sendMessage({ framework: frontend });
  cleanUp();
}

chrome.runtime.onMessage.addListener(function() {
  checkFE();
});

setTimeout(checkFE, 1000);
