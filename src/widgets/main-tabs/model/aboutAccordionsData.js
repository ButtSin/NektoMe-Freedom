import { ABOUT_ACCORDION_IDS } from './constants';

const accordionsAboutData = [
  { id: ABOUT_ACCORDION_IDS.disclaimer, title: 'Дисклеймер' },
  { id: ABOUT_ACCORDION_IDS.changelog, title: 'История изменений' },
  { id: ABOUT_ACCORDION_IDS.privacy, title: 'Конфиденциальность и исходный код' },
  { id: ABOUT_ACCORDION_IDS.credits, title: 'Благодарности' },
  { id: ABOUT_ACCORDION_IDS.materials, title: 'Использованные материалы' },
];

accordionsAboutData.map((accordion) => (accordion.name = 'about'));

export { accordionsAboutData };
