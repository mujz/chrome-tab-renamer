var titles = {};

/**
 * Save tab title and send message to content script to update the document title.
 * @param {String} title the new page title
 * @param {int} tabId the ID of the current tab
 */
function updateTitle(title, tabId) {
  titles[tabId] = title;
  chrome.tabs.sendMessage(tabId, title);
}

/**
 * onMessage listener callback. Fires when a message is received from another script
 * @param {Object} msg contains the tab ID and new title
 * @param {int} msg.tabId the ID of the tab to change the title of
 * @param {string} msg.title the new tab title
 */
function onMessageListener(msg) {
  updateTitle(msg.title, msg.tabId);
}

/**
 * onUpdated listener callback. Fires when a tab is updated.
 * Note: a 2nd parameter can be passed to give the change info which may include the status (either "loading" or "complete")
 * Note: a 3rd parameter can be passed to give the updated tab object
 * @param {int} tabId the ID of the updated tab
 */
function onUpdatedListener(tabId) {
  // if a tab that we already have a new title for has been updated, update its title again.
  if (tabId in titles) updateTitle(titles[tabId], tabId);
}

/**
 * onOmniboxInputChanged listener callback.
 * Fires when a user types in the omnibox after entering the specifies keyword in the manifest and pressing the Tab key.
 * Note: A second parameter can be passed to give a suggestion callback
 * @param {String} title the text in the omnibox
 */
function onOmniboxInputChanged(title) {
  // Get current tab object
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    // update the title.
    updateTitle(title, tab.id);
  });
}

// Add the listeners
chrome.omnibox.onInputChanged.addListener(onOmniboxInputChanged);
chrome.runtime.onMessage.addListener(onMessageListener);
chrome.tabs.onUpdated.addListener(onUpdatedListener);