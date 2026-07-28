import IconGear from '@/shared/ui/atoms/icons/IconGear.jsx';
import IconHeart from '@/shared/ui/atoms/icons/IconHeart.jsx';
import IconInfo from '@/shared/ui/atoms/icons/IconInfo.jsx';

import { About } from '../ui/about';
import { Help } from '../ui/help';
import { Settings } from '../ui/settings';

const tabsPanel = [
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

export { tabsPanel };
