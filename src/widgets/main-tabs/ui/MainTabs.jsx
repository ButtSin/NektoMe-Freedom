import { useLayoutEffect, useState } from 'react';

import { SETTINGS_IDS, settingsManager } from '@/entities/settings';
import { SETTINGS_TABS_IDS } from '@/entities/settings/api/constants';
import { Tabs } from '@/shared/ui/organisms/Tabs';

import { mainTabsPanelsData } from '../model/mainTabsPanelsData';

import { getMainTabsPanelContent } from './mainTabsPanelsContent';

const tabsPanel = mainTabsPanelsData.map((tab) => {
  const content = getMainTabsPanelContent(tab.id);

  return {
    id: tab.id,
    description: tab.description,
    icon: content.icon,
    panel: content.panel,
  };
});

const tabsKey = SETTINGS_TABS_IDS.mainTabs;

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
      tabs={tabsPanel}
      selected={selectedTab}
      onSelect={handleSelectTab}
    />
  );
};

export { MainTabs };
