import { settingsManager } from '@/entities/settings';
import { browserApi } from '@/entities/settings/config/browser';
import { extensionVersion, extensionName } from '@/shared/config/constants';

(async () => {
  try {
    await settingsManager.initAllLocalSettings();
  } catch (error) {
    console.error(`[${extensionName} v${extensionVersion}] Ошибка инициализации настроек `, error);
  }
})();

browserApi.runtime.onInstalled.addListener(async () => {
  const nektoPattern = '*://nekto.me/chat/*';

  try {
    const tabs = await browserApi.tabs.query({ url: nektoPattern });

    for (const tab of tabs) {
      if (tab.id) {
        await browserApi.tabs.reload(tab.id, { bypassCache: true });
      }
    }
  } catch (error) {
    console.error(`[${extensionName} v${extensionVersion}] Ошибка перезагрузки вкладок `, error);
  }
});
