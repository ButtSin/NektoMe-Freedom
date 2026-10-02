import { browserApi } from '@/shared/lib/extension/browserApi';
import { getExtensionInfo } from '@/shared/lib/extension/info';

const { EXTENSION_NAME, EXTENSION_VERSION } = getExtensionInfo();

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
