import IconGear from "@/shared/ui/icons/IconGear.jsx";
import IconInfo from "@/shared/ui/icons/IconInfo.jsx";
import IconHeart from "@/shared/ui/icons/IconHeart.jsx";

import { Settings } from "../ui/settings";
import { About } from "../ui/about";
import { Help } from "../ui/help";

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
