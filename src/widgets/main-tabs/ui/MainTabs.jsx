import { useEffect, useState } from 'react';

import { SETTINGS_IDS, settingsManager } from '@/entities/settings';
import { Tabs } from '@/shared/ui/organisms/Tabs';

import { tabsKey } from '../config/constants';
import { tabsPanel } from '../config/tabsData';

const MainTabs = () => {
  const [selectedTab, setSelectedTab] = useState(null);

  const handleSelectTab = (tabId) => {
    setSelectedTab(tabId);

    settingsManager.setSettingValue(SETTINGS_IDS.tabs, tabId, tabsKey);
  };

  useEffect(() => {
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
      tabs={tabsPanel}
      selected={selectedTab}
      onSelect={handleSelectTab}
    />
  );
};

export { MainTabs };
