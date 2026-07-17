import IconGear from "@/shared/icons/IconGear.jsx";
import IconInfo from "@/shared/icons/IconInfo.jsx";
import IconHeart from "@/shared/icons/IconHeart.jsx";

import { Settings } from "../ui/settings";
import { About } from "../ui/about";
import { Help } from "../ui/Help";

const tabsPanel = [
  {
    id: "settings",
    icon: <IconGear />,
    description: "Настройки",
    panel: <Settings />,
  },
  {
    id: "about",
    icon: <IconInfo />,
    description: "О расширении",
    panel: <About />,
  },
  {
    id: "help",
    icon: <IconHeart />,
    description: "Помочь проекту",
    panel: <Help />,
  },
];

export { tabsPanel };
