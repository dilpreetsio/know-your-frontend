var reactSelector = '[data-reactroot], [data-reactid]';
var angularSelector = '[ng-app], [ng-model],[ng-controller],[ng-version],[ng-binding]';
var emberSelector = '.ember-application';
var frontend = '';

function checkFE() {
  console.log('checkFE');
  if (document.querySelector(reactSelector)) {
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

chrome.runtime.onMessage.addListener(function(state) {
  if (state.status) {
    checkFE();    
  }
});
