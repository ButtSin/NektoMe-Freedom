import IconGear from "@/shared/ui/atoms/icons/IconGear.jsx";
import IconInfo from "@/shared/ui/atoms/icons/IconInfo.jsx";
import IconHeart from "@/shared/ui/atoms/icons/IconHeart.jsx";

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
