/**
 * onMessage listener callback. Fires when a message is received from another script.
 * @param {title} title the new title
 */
function onMessageListener(title) {
  document.title = title;
}

// Add the listener
chrome.runtime.onMessage.addListener(onMessageListener);