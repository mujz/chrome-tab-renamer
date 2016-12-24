# Tab Renamer
A Chrome extension that allows you to change the title of any tab.
![Tab bar screenshot](./screenshots/tabbar.png?raw=true)

##Usage
There are 3 ways to change the page title:
1. Clicking on the icon in the tab bar
![Click on icon](./screenshots/mouse.png?raw=true)
1. Using the shortcut `ctrl` (or &#8984;) + `B`
![Keyboard shortcut](./screenshots/shortcut.png?raw=true)
1. Type `rn` in the address bar, then press the tab key.
![Omnibox](./screenshots/omnibox.png?raw=true)

##How it works
Apart from `manifest.json`, which is self-explanatory, there are `popup`, `background`, and `content`.

###Content Script
>Content scripts are JavaScript files that run in the context of web pages. By using the standard Document Object Model (DOM), they can read details of the web pages the browser visits, or make changes to them.

Our `content.js` has a message listener that gets fired when one of the other extension's scripts sends a message. The listener updates the `document.title` with the one included in the message.

Currently, we're only sending a message from `background.js` to `content.js` every time the title is updated.

###Background (Event Page)
>A single long-running script to manage some task or state.

This is the most complex part of the extension. It has a global variable that stores the updated titles and 3 listeners that update it. The reason we need to store the updated titles is so that when a page is reloaded or the user follows a link within the page, the user inputted title persists.

The 3 listeners all essentially do the same thing, save the new title and send it in a message to the content script. 
The listeners are fired by user input from the omnibox or extension's popup, or when the page gets updated (ex. when the page is reloaded).

###Popup (Browser Action)
>Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its icon, a browser action can also have a tooltip, a badge, and a popup. 

All it is is a text input box that fires a listener when there is user input, which sends a message to the background script to save and update the page's title.