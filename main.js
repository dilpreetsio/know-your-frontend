var reactSelector = '[data-reactroot], [data-reactid]';
var angularSelector = '[ng-app], [ng-model],[ng-controller],[ng-version],[ng-binding]';
var emberSelector = '.ember-application';

function checkFE() {
  var frontend = '';
  if (document.querySelector(reactSelector) || (window.require && window.require('React'))) {
    frontend = 'react';
  } else if(document.querySelector(angularSelector)) {
    frontend = 'angular';
  } else if(document.querySelector(emberSelector)) {
    frontend = 'ember';
  } else {
    frontend = 'none';
  }
  chrome.runtime.sendMessage({ framework: frontend });
}

chrome.runtime.onMessage.addListener(function() {
  checkFE();
});

setTimeout(checkFE, 1000);
