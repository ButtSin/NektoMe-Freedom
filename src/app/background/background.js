import { browserApi } from '@/shared/lib/browser';
import { EXTENSION_NAME, EXTENSION_VERSION } from '@/shared/config/appMeta';

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
    console.error(`[${EXTENSION_NAME} v${EXTENSION_VERSION}] Ошибка перезагрузки вкладок `, error);
  }
});
