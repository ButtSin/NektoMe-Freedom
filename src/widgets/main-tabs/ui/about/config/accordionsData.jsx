import { extensionVersion } from "@/shared/config/constants.js";

import IconExclamationMark from "@/shared/icons/IconExclamationMark.jsx";
import IconSourceCode from "@/shared/icons/IconSourceCode.jsx";
import IconThumb from "@/shared/icons/IconThumb.jsx";
import IconHummer from "@/shared/icons/IconHummer.jsx";
import IconCloudArrowUp from "@/shared/icons/IconCloudArrowUp.jsx";

const accordionsData = [
  {
    name: "base-info",
    children: (
      <p>
        Автор данного расширения не пропагандирует какие-либо социальные,
        политические или идеологические взгляды. Оно — лишь технический
        инструмент, выполняющий множество различных функций. Взаимодействие
        участников осуществляется исключительно по общему согласию и
        регулируется правилами платформы «NektoMe». Используя это расширение, вы
        подтверждаете, что достигли совершеннолетнего возраста и не выходите за
        рамки законодательства страны, в которой пребываете. Разработчик не
        несёт ответственности за нарушения пользователями тех или иных правил и
        законов.
      </p>
    ),
    title: "Дисклеймер",
    icon: <IconExclamationMark />,
  },
  {
    name: "base-info",
    children: (
      <>
        <p>Версия {extensionVersion} включает в себя следующие изменения:</p>
        <ul>
          <li>код портирован на React;</li>
          <li>переработан дизайн с использованием «HeroUI&nbsp;V3»;</li>
          <li>
            расширение адаптировано для работы под популярные десктопные
            браузеры и опубликовано в соответствующих магазинах;
          </li>
          <li>
            добавлена новая функция: «Советы по безопасности». Вы можете
            просматривать их отдельно и во время поиска собеседника.
          </li>
        </ul>
      </>
    ),
    title: `Изменения в обновлении ${extensionVersion}`,
    icon: <IconCloudArrowUp />,
  },
  {
    name: "base-info",
    children: (
      <p>
        Данное расширение не собирает и, соответственно, не использует никаких
        данных. Вы можете убедиться в этом сами, ознакомившись с его исходным
        кодом, выложенным на{" "}
        <a target="_blank" href="https://github.com/ButtSin/NektoMe-Freedom">
          GitHub
        </a>{" "}
        под лицензией MIT.
      </p>
    ),
    title: "Исходный код и конфиденциальность",
    icon: <IconSourceCode />,
  },
  {
    name: "base-info",
    children: (
      <p>
        Спасибо{" "}
        <a target="_blank" href="https://github.com/VolrakNik">
          VolrakNik
        </a>{" "}
        за объяснение работы backend-части сайта «nekto.me».
      </p>
    ),
    title: "Благодарности",
    icon: <IconThumb />,
  },
  {
    name: "base-info",
    children: (
      <>
        <p>Текущая версия расширения использует следующие материалы:</p>
        <ul>
          <li>
            <a target="_blank" href="https://v3.heroui.com/">
              «HeroUI&nbsp;V3 (ранее NextUI)»
            </a>{" "}
            — в качестве основы дизайна;
          </li>
          <li>
            <a target="_blank" href="https://github.com/gravity-ui/icons">
              «Gravity-UI&nbsp;Icons»
            </a>{" "}
            — для большинства иконок.
          </li>
        </ul>
      </>
    ),
    title: "Использованные материалы",
    icon: <IconHummer />,
  },
];

export { accordionsData };
