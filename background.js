var basePath = 'images/';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.framework === 'react') {
      chrome.browserAction.setIcon({path: basePath + 'react.png'});
    } else if (request.framework === 'ember') {
      chrome.browserAction.setIcon({path: basePath + 'ember.png'});
    } else if (request.framework === 'angular') {
      chrome.browserAction.setIcon({path: basePath + 'angular.png'});
    } else if (request.framework === 'none') {
      chrome.browserAction.setIcon({path: basePath + 'unknown.png'});
    }
  });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.selected && tab.url !== 'chrome://newtab/') {
    chrome.tabs.sendMessage(tabId, { status: true });
  } else if(tab.url === 'chrome://newtab/') {
    chrome.browserAction.setIcon({path: basePath + 'icon32.png'});
  }
});

chrome.tabs.onActivated.addListener(function(tab, changeInfo, tabId) {
  chrome.tabs.sendMessage(tab.tabId, { status: true });
})
