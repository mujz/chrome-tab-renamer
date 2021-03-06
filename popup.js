
/**
 * Send message to background script to store and update the document title, or close the window if enter is pressed.
 * @param {String} title the new page title
 * @param {int} keyCode the keyCode of the last key press
 * @param {int} tabId the ID of the current tab
 */
function updateTitle(title, keyCode, tabId) {
  var ENTER_KEY_CODE = 13;

  if (keyCode === ENTER_KEY_CODE) {
    close();
  } else {
    chrome.runtime.sendMessage({tabId: tabId, title: title});
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('title_form');
  var input = form.title;

  // Get current tab object
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    input.placeholder = tab.title; // set current tab title as placeholder for the input field

    // Bind the text input to the updateTitle function
    form.addEventListener('keyup', function(data) {
      updateTitle(input.value, data.keyCode, tab.id);
    }, false);
  });
});
