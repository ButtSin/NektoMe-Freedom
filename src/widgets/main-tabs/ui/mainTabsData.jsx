import IconGear from '@/shared/ui/atoms/icons/IconGear.jsx';
import IconHeart from '@/shared/ui/atoms/icons/IconHeart.jsx';
import IconInfo from '@/shared/ui/atoms/icons/IconInfo.jsx';

import { About } from './about/About';
import { Help } from './help/Help';
import { Settings } from './settings/Settings';

const mainTabsData = [
  {
    tabId: 'settings',
    buttonId: 'button-settings',
    icon: <IconGear />,
    description: 'Настройки',
    panel: <Settings />,
  },
  {
    tabId: 'about',
    buttonId: 'button-about',
    icon: <IconInfo />,
    description: 'О расширении',
    panel: <About />,
  },
  {
    tabId: 'help',
    buttonId: 'button-help',
    icon: <IconHeart />,
    description: 'Помочь проекту',
    panel: <Help />,
  },
];

export { mainTabsData };
