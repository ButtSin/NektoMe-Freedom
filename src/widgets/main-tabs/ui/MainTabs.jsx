import { Tabs } from "@/shared/ui/organisms/Tabs";
import { settingsManager } from "@/entities/settings";
import { useEffect, useState } from "react";

import { tabsPanel } from "../config/tabsPanel";
import { SKELETON_TAB_COUNT, tabsKey } from "../config/constants";

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
    <>
      <Tabs
        heading="Навигация по расширению"
        headingId="main-navigation"
        tabs={tabsPanel.length === 0 ? SKELETON_TAB_COUNT : tabsPanel}
        selected={selectedTab}
        onSelect={handleSelectTab}
      />
    </>
  );
};

export default MainTabs;
