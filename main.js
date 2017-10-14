var reactSelector = '[data-reactroot], [data-reactid]';
var angularSelector = '[ng-app], [ng-model],[ng-controller],[ng-version],[ng-binding]';
var emberSelector = '.ember-application';


function checkFE() {
  var frontend = '';
  var doc=document.all;
  doc=[...doc];
  var kb=doc.filter(function(item){ 
    if(item.hasAttribute('kb-inject')) return item; 
  });
  if (document.querySelector(reactSelector)) {
    frontend = 'react';
  } else if(document.querySelector(angularSelector)) {
    frontend = 'angular';
  } else if(document.querySelector(emberSelector)) {
    frontend = 'ember';
  }else if(kb.length>0) {
    frontend = 'KnockbackJs';
  } else {
    frontend = 'none';
  }
  chrome.runtime.sendMessage({ framework: frontend });
}

chrome.runtime.onMessage.addListener(function() {
  checkFE();
});

setTimeout(checkFE, 1000);
