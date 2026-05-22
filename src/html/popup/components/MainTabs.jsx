import IconGear from "@/icons/IconGear.jsx";
import IconInfo from "@/icons/iconInfo.jsx";
import IconHeart from "@/icons/IconHeart.jsx";

import BaseTabs from "@/html/shared/components/BaseTabs/BaseTabs.jsx";
import TheSettings from "@/html/popup/components/Settings/TheSettings.jsx";
import TheAbout from "@/html/popup/components/About/TheAbout.jsx";
import TheHelp from "@/html/popup/components/Help/TheHelp.jsx";

const tabs = [
  {
    id: "settings",
    icon: <IconGear />,
    description: "Настройки",
    panel: TheSettings,
  },
  {
    id: "about",
    icon: <IconInfo />,
    description: "О расширении",
    panel: TheAbout,
  },
  {
    id: "help",
    icon: <IconHeart />,
    description: "Помочь проекту",
    panel: TheHelp,
  },
];
const tabsKey = "popupMainTabs";
const selectedTab = "settings";

const MainTabs = (props) => {
  return (
    <>
      <BaseTabs
        heading="Навигация по расширению"
        headingId="main-navigation"
        tabs={tabs}
        selected={selectedTab}
      />
    </>
  );
};

export default MainTabs;
