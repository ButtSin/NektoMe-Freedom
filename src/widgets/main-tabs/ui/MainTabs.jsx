import { useEffect, useState } from 'react';

import { settingsManager } from '@/entities/settings';
import { Tabs } from '@/shared/ui/organisms/Tabs';

import { tabsKey } from '../config/constants';
import { tabsPanel } from '../config/tabsData';

const MainTabs = () => {
  const [selectedTab, setSelectedTab] = useState(null);

  const handleSelectTab = (id) => {
    setSelectedTab(id);
    settingsManager.setSessionTabsState(tabsKey, id);
  };

  useEffect(() => {
    settingsManager.getSessionTabsState(tabsKey).then((savedTab) => {
      setSelectedTab(savedTab);
    });
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
