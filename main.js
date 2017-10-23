var frontend = '';
var reactSelector = '[data-reactroot], [data-reactid]';
var angularSelector = '[ng-app], [ng-model],[ng-controller],[ng-version],[ng-binding]';
var emberSelector = '.ember-application';
var vueSelector = '#detect-vue';
var knockoutSelector = '#detect-knockout';
var backboneSelector = '#detect-backbone';
var polymerSelector = '#detect-polymer';
var aureliaSelector = '[aurelia-app]';

function injectScript() {
  var script = document.createElement('script');
  script.textContent = '(' +
    function () {
      var selector;
      if (window.Vue && window.Vue.version) {
        selector = "detect-vue";
      }
      if (window.ko && window.ko.version) {
        selector = "detect-knockout";
      }
      if (window.Backbone && window.Backbone.VERSION) {
        selector = "detect-backbone";
      }
      if (window.Polymer && window.Polymer.version) {
        selector = "detect-polymer";
      }
      if (selector) {
        var el = document.createElement("span");
        el.setAttribute("id", selector);
        document.body.appendChild(el);
      }
    }
    + ')();';
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}

function cleanUp() {
  [vueSelector, knockoutSelector, backboneSelector, polymerSelector].map(function (selector) {
    var el = document.getElementById(selector.replace("#", ""));
    if (el) {
      el.remove();
    }
  });
}

function checkFE() {
  injectScript();
  if (document.querySelector(reactSelector) || (window.require && window.require('React'))) {
    frontend = 'react';
  } else if(document.querySelector(angularSelector)) {
    frontend = 'angular';
  } else if(document.querySelector(emberSelector)) {
    frontend = 'ember';
  } else if(document.querySelector(vueSelector)) {
    frontend = 'vue';
  } else if(document.querySelector(knockoutSelector)) {
    frontend = 'knockout';
  } else if(document.querySelector(backboneSelector)) {
    frontend = 'backbone';
  } else if(document.querySelector(polymerSelector)) {
    frontend = 'polymer';
  } else if(document.querySelector(aureliaSelector)) {
    frontend = 'aurelia';
  } else {
    frontend = 'none';
  }
  chrome.runtime.sendMessage({ framework: frontend });
  cleanUp();
}

chrome.runtime.onMessage.addListener(function(status) {
  setTimeout(checkFE, 1000);
});
