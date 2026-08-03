import IconClockArrow from '@/shared/ui/atoms/icons/IconClockArrow';
import IconExclamationMark from '@/shared/ui/atoms/icons/IconExclamationMark.jsx';
import IconHummer from '@/shared/ui/atoms/icons/IconHummer.jsx';
import IconShield from '@/shared/ui/atoms/icons/IconShield.jsx';
import IconThumb from '@/shared/ui/atoms/icons/IconThumb.jsx';

const accordionsData = [
  {
    name: 'base-info',
    children: (
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
    title: 'Дисклеймер',
    icon: <IconExclamationMark />,
  },
  {
    name: 'base-info',
    children: (
      <ul>
        <li>код портирован на React;</li>
        <li>переработан дизайн с использованием «HeroUI&nbsp;V3»;</li>
        <li>расширение адаптировано для работы в популярных десктопных браузерах.</li>
        {/* <li>
            расширение адаптировано для работы в популярных десктопных браузерах и опубликовано в
            соответствующих магазинах;
          </li> */}
        {/* <li>
            добавлена новая функция: «Советы по безопасности». Вы можете просматривать их отдельно и
            во время поиска собеседника.
          </li> */}
      </ul>
    ),
    title: 'История изменений',
    icon: <IconClockArrow />,
  },
  {
    name: 'base-info',
    children: (
      <p>
        Данное расширение не собирает и, соответственно, не использует никаких данных. Вы можете
        убедиться в этом сами, ознакомившись с его исходным кодом, выложенным на{' '}
        <a target='_blank' href='https://github.com/ButtSin/NektoMe-Freedom'>
          GitHub
        </a>{' '}
        под лицензией MIT.
      </p>
    ),
    title: 'Конфиденциальность и исходный код',
    icon: <IconShield />,
  },
  {
    name: 'base-info',
    children: (
      <p>
        Спасибо{' '}
        <a target='_blank' href='https://github.com/VolrakNik'>
          VolrakNik
        </a>{' '}
        за объяснение работы backend-части сайта «nekto.me».
      </p>
    ),
    title: 'Благодарности',
    icon: <IconThumb />,
  },
  {
    name: 'base-info',
    children: (
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
    title: 'Использованные материалы',
    icon: <IconHummer />,
  },
];

export { accordionsData };
