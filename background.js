var titles = {};

/**
 * Send message to content script to update the document title.
 * @param {String} title the new page title
 * @param {int} tabId the ID of the current tab
 */
function updateTitle(title, tabId) {
  chrome.tabs.sendMessage(tabId, title);
}

/**
 * onMessage listener callback. Fires when a message is received from another script
 * @param {Object} msg contains the tab ID and new title
 * @param {int} msg.tabId the ID of the tab to change the title of
 * @param {string} msg.title the new tab title
 */
function onMessageListener(msg) {
  // Save the tab's received title and update it.
  titles[msg.tabId] = msg.title;
  updateTitle(msg.title, msg.tabId);
}

/**
 * onUpdated listener callback. Fires when a tab is updated.
 * Note: a 3rd parameter can be passed to give the updated tab object
 * @param {int} tabId the ID of the updated tab
 * @param {Object} changeInfo contains the status of the updated tab if there is one
 * @param {string} [changeInfo.status either loading or complete]
 */
function onUpdatedListener(tabId, changeInfo) {
  // if a tab that we already have a new title for has completed updating, update its title again.
  if (tabId in titles && changeInfo.status === 'complete') updateTitle(titles[tabId], tabId);
}

// Add the listeners
chrome.runtime.onMessage.addListener(onMessageListener);
chrome.tabs.onUpdated.addListener(onUpdatedListener);