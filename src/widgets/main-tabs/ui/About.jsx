import { Accordion } from '@/shared/ui/atoms/Accordion';

import { accordionsData } from '../config/accordionsData';

const About = () => {
  return accordionsData.map((accordion) => {
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
