import { settingsManager } from '@/entities/settings';
import { extensionVersion, extensionName } from '@/shared/config/constants';

(async () => {
  try {
    await settingsManager.initAllLocalSettings();
  } catch (error) {
    console.error(`[${extensionName} v${extensionVersion}] Ошибка инициализации настроек `, error);
  }
})();

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
    console.error(`[${extensionName} v${extensionVersion}] Ошибка перезагрузки вкладок `, error);
  }
});
