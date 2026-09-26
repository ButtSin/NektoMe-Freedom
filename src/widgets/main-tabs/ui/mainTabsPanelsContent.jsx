import IconGear from '@/shared/ui/atoms/icons/IconGear.jsx';
import IconHeart from '@/shared/ui/atoms/icons/IconHeart.jsx';
import IconInfo from '@/shared/ui/atoms/icons/IconInfo.jsx';

import { MAIN_TABS_PANEL_IDS } from '../model/constants';
import { About } from '../ui/About';
import { Help } from '../ui/Help';
import { Settings } from '../ui/Settings';

const mainTabsPanelContent = {
  [MAIN_TABS_PANEL_IDS.settings]: {
    icon: <IconGear />,
    panel: <Settings />,
  },

  [MAIN_TABS_PANEL_IDS.about]: {
    icon: <IconInfo />,
    panel: <About />,
  },

  [MAIN_TABS_PANEL_IDS.help]: {
    icon: <IconHeart />,
    panel: <Help />,
  },
};

const getMainTabsPanelContent = (id) => mainTabsPanelContent[id] ?? { icon: null, panel: null };

export { getMainTabsPanelContent };
