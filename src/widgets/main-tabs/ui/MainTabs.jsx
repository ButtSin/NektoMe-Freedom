import { useLayoutEffect, useState } from 'react';

import { SETTINGS_IDS, settingsManager } from '@/entities/settings';
import { UI_EVENTS } from '@/shared/config/events';
import { Tabs } from '@/shared/ui/organisms/Tabs';

import { mainTabsData } from './mainTabsData';

const tabsKey = SETTINGS_IDS.popupMainTabs;

const MainTabs = () => {
  const [selectedTab, setSelectedTab] = useState(null);

  const handleSelectTab = (tabId) => {
    setSelectedTab(tabId);

    settingsManager.setSettingValue(SETTINGS_IDS.tabs, tabId, tabsKey);
  };

  useLayoutEffect(() => {
    const initMainTabs = async () => {
      const savedTab = await settingsManager.getSettingValue(SETTINGS_IDS.tabs, tabsKey);
      setSelectedTab(savedTab);
    };

    initMainTabs();
  }, []);

  return (
    <Tabs
      heading='Навигация по расширению'
      headingId='main-navigation'
      tabs={mainTabsData}
      selected={selectedTab}
      onSelect={handleSelectTab}
      onFirstRender={() => document.dispatchEvent(new Event(UI_EVENTS.firstTabsUpdate))}
    />
  );
};

export { MainTabs };
