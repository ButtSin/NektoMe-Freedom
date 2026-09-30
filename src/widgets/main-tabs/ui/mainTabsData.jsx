import IconGear from '@/shared/ui/atoms/icons/IconGear.jsx';
import IconHeart from '@/shared/ui/atoms/icons/IconHeart.jsx';
import IconInfo from '@/shared/ui/atoms/icons/IconInfo.jsx';

import { About } from './about/About';
import { Help } from './help/Help';
import { Settings } from './settings/Settings';

const mainTabsData = [
  {
    id: 'settings',
    icon: <IconGear />,
    description: 'Настройки',
    panel: <Settings />,
  },
  {
    id: 'about',
    icon: <IconInfo />,
    description: 'О расширении',
    panel: <About />,
  },
  {
    id: 'help',
    icon: <IconHeart />,
    description: 'Помочь проекту',
    panel: <Help />,
  },
];

export { mainTabsData };
