import IconGear from "@/shared/icons/IconGear.jsx";
import IconInfo from "@/icons/iconInfo.jsx";
import IconHeart from "@/shared/icons/IconHeart.jsx";

import BaseTabs from "@/shared/ui/organisms/Tabs/Tabs.jsx";
import TheSettings from "@/html/popup/components/Settings/TheSettings.jsx";
import TheAbout from "@/html/popup/components/About/TheAbout.jsx";
import TheHelp from "@/html/popup/components/Help/TheHelp.jsx";

import SettingsManager from "@/entities/settings/model/SettingsManager.js";
import { useEffect, useState } from "react";

const SKELETON_TAB_COUNT = 3;
const tabs = [
  {
    id: "settings",
    icon: <IconGear />,
    description: "Настройки",
    panel: <TheSettings />,
  },
  {
    id: "about",
    icon: <IconInfo />,
    description: "О расширении",
    panel: <TheAbout />,
  },
  {
    id: "help",
    icon: <IconHeart />,
    description: "Помочь проекту",
    panel: <TheHelp />,
  },
];
const tabsKey = "popupMainTabs";

const MainTabs = () => {
  const [selectedTab, setSelectedTab] = useState(null);

  const handleSelectTab = (id) => {
    setSelectedTab(id);
    SettingsManager.setSessionTabsState(tabsKey, id);
  };

  useEffect(() => {
    SettingsManager.getSessionTabsState(tabsKey).then((savedTab) => {
      setSelectedTab(savedTab);
    });
  }, []);

  return (
    <>
      <BaseTabs
        heading="Навигация по расширению"
        headingId="main-navigation"
        tabs={tabs.length === 0 ? SKELETON_TAB_COUNT : tabs}
        selected={selectedTab}
        onSelect={handleSelectTab}
      />
    </>
  );
};

export default MainTabs;
