chrome.runtime.onInstalled.addListener(() => {
  console.log('Starting extension..');

  chrome.tabs.update(undefined, { url: 'http://adfoc.us/8638991' }, (tab) => {
    console.log("Navigated to the URL.");

    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
      if (tabId === tab.id && changeInfo.status === 'complete') {
        console.log('Page fully loaded.');

        // Show an alert once the site is fully loaded
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const element = document.querySelector(".skip");
            if (element) element.click();
          },
        }, () => {
          console.log('Skip button clicked.');
        });
      }
    });
  });
});
