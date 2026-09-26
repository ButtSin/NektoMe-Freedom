import { Accordion } from '@/shared/ui/atoms/Accordion';

import { accordionsAboutData } from '../model/aboutAccordionsData';

import { getAboutAccordionContent } from './aboutAccordionsContent';

const ABOUT_ACCORDION_GROUP = 'about';

const About = () => {
  return accordionsAboutData.map((accordion) => {
    const { icon, content } = getAboutAccordionContent(accordion.id);

    return (
      <Accordion
        key={accordion.id}
        name={ABOUT_ACCORDION_GROUP}
        title={accordion.title}
        icon={icon}
      >
        {content}
      </Accordion>
    );
  });
};

export { About };
