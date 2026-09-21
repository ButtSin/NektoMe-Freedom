import { compareVersions } from '../model/compareVersions';

const changelogData = [
  {
    description: '1.0.0 (публиковалась лишь в GitHub)',
    value: '1.0.0',
    children: (
      <ul>
        <li>код портирован на React;</li>
        <li>переработан дизайн с использованием «HeroUI&nbsp;V3»;</li>
        <li>расширение адаптировано для работы в популярных десктопных браузерах.</li>
      </ul>
    ),
  },
  /*{
    description: '1.2.0',
    value: '1.2.0',
    children: (
      <ul>
        <li>
          расширение адаптировано для работы в популярных десктопных браузерах и опубликовано в
          соответствующих магазинах;
        </li>
        <li>
          добавлена новая функция: «Советы по безопасности». Вы можете просматривать их отдельно и
          во время поиска собеседника.
        </li>
      </ul>
    ),
  } */
]

  .sort((a, b) => compareVersions(a.value, b.value))
  .map((option, index) => ({ ...option, id: 'version-' + option.value, isSelected: index === 0 }));

export { changelogData };
