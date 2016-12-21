// Listen to message containing the title from the popup script
chrome.runtime.onMessage.addListener(function(title) {
  console.log(title);
  document.title = title;
});