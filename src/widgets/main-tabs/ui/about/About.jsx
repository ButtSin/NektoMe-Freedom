import { Accordion } from '@/shared/ui/atoms/Accordion';

import { mainTabsAccordionsData } from './aboutAccordionsData';

const About = () => {
  return mainTabsAccordionsData.map((accordion) => {
    return (
      <Accordion
        key={accordion.title}
        name={accordion.name}
        title={accordion.title}
        open={accordion.open}
        icon={accordion.icon}
      >
        {accordion.children}
      </Accordion>
    );
  });
};

export { About };
