var basePath = 'images/';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.framework === 'react') {
      chrome.browserAction.setIcon({path: basePath + 'react.png'});
    } else if (request.framework === 'ember') {
      chrome.browserAction.setIcon({path: basePath + 'ember.png'});
    } else if (request.framework === 'angular') {
      chrome.browserAction.setIcon({path: basePath + 'angular.png'});
    } else if (request.framework === 'vue') {
      chrome.browserAction.setIcon({path: basePath + 'vue.png'});
    } else if (request.framework === 'knockout') {
      chrome.browserAction.setIcon({path: basePath + 'knockout.png'});
    } else if (request.framework === 'none') {
      chrome.browserAction.setIcon({path: basePath + 'unknown.png'});
    }
  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.tabs.sendMessage(tabId, { status: true });
});

chrome.tabs.onActivated.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.tabId, { status: true });
});
