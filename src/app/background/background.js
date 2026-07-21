chrome.runtime.onInstalled.addListener(async () => {
  const nektoPattern = '*://nekto.me/chat/*';

  try {
    const tabs = await chrome.tabs.query({ url: nektoPattern });

    for (const tab of tabs) {
      if (tab.id) {
        await chrome.tabs.reload(tab.id, { bypassCache: true });
      }
    }
  } catch (error) {
    console.error('Failed to reload tabs on install:', error);
  }
});
