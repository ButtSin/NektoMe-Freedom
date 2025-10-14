chrome.runtime.onInstalled.addListener(() => {
  injectNektoScript();
});

function injectNektoScript() {
  const nektoPattern = "*://nekto.me/chat/*";
  
  chrome.tabs.query({url: nektoPattern }, (tabs) => {
    tabs.forEach(tab => {
      if (tab.id) {
        chrome.tabs.reload(tab.id, {
          bypassCache: true 
        });
      }
    });
  });
}