import { Changelog } from '@/entities/changelog';
import IconClockArrow from '@/shared/ui/atoms/icons/IconClockArrow';
import IconExclamationMark from '@/shared/ui/atoms/icons/IconExclamationMark.jsx';
import IconHummer from '@/shared/ui/atoms/icons/IconHummer.jsx';
import IconShield from '@/shared/ui/atoms/icons/IconShield.jsx';
import IconThumb from '@/shared/ui/atoms/icons/IconThumb.jsx';

import { ABOUT_ACCORDION_IDS } from '../model/constants';

const aboutAccordionContent = {
  [ABOUT_ACCORDION_IDS.disclaimer]: {
    icon: <IconExclamationMark />,
    content: (
      <p>
        Автор данного расширения не пропагандирует какие-либо социальные, политические или
        идеологические взгляды. Оно — лишь технический инструмент, выполняющий множество различных
        функций. Взаимодействие участников осуществляется исключительно по общему согласию и
        регулируется правилами платформы «NektoMe». Используя это расширение, вы подтверждаете, что
        достигли совершеннолетнего возраста и не выходите за рамки законодательства страны, в
        которой пребываете. Разработчик не несёт ответственности за нарушения пользователями тех или
        иных правил и законов.
      </p>
    ),
  },

  [ABOUT_ACCORDION_IDS.changelog]: {
    icon: <IconClockArrow />,
    content: <Changelog />,
  },

  [ABOUT_ACCORDION_IDS.privacy]: {
    icon: <IconShield />,
    content: (
      <p>
        Данное расширение не собирает и, соответственно, не использует никаких данных. Вы можете
        убедиться в этом сами, ознакомившись с его исходным кодом, выложенным на{' '}
        <a target='_blank' href='https://github.com/ButtSin/NektoMe-Freedom'>
          GitHub
        </a>{' '}
        под лицензией MIT.
      </p>
    ),
  },

  [ABOUT_ACCORDION_IDS.credits]: {
    icon: <IconThumb />,
    content: (
      <p>
        Спасибо{' '}
        <a target='_blank' href='https://github.com/VolrakNik'>
          VolrakNik
        </a>{' '}
        за объяснение работы backend-части сайта «nekto.me».
      </p>
    ),
  },

  [ABOUT_ACCORDION_IDS.materials]: {
    icon: <IconHummer />,
    content: (
      <>
        <p>Текущая версия расширения использует следующие материалы:</p>
        <ul>
          <li>
            <a target='_blank' href='https://v3.heroui.com/'>
              «HeroUI&nbsp;V3 (ранее NextUI)»
            </a>{' '}
            — в качестве основы дизайна;
          </li>
          <li>
            <a target='_blank' href='https://github.com/gravity-ui/icons'>
              «Gravity-UI&nbsp;Icons»
            </a>{' '}
            — для большинства иконок.
          </li>
        </ul>
      </>
    ),
  },
};

const getAboutAccordionContent = (id) => aboutAccordionContent[id] ?? { icon: null, content: null };

export { getAboutAccordionContent };
