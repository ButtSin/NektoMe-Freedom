import IconGear from "@/icons/IconGear.jsx";
import IconInfo from "@/icons/iconInfo.jsx";
import IconHeart from "@/icons/IconHeart.jsx";

const tabs = [
  {
    id: "settings",
    icon: IconGear,
    description: "Настройки",
    // panel: TheSettings,
  },
  {
    id: "about",
    icon: IconInfo,
    description: "О расширении",
    // panel: TheAbout,
  },
  {
    id: "help",
    icon: IconHeart,
    description: "Помочь проекту",
    // panel: TheHelp,
  },
];
const tabsKey = "popupMainTabs";
const selectedTab = null;

const MainTabs = (props) => {
  return <div>Табы</div>;
};

export default MainTabs;
