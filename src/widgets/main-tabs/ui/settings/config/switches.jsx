import { STORAGE_KEYS } from '@/entities/settings';

const switches = [
  {
    id: STORAGE_KEYS.content.sexFieldUnlocked,
    mainDescription: 'Отключить ограничения выбора собеседников',
    secondaryDescription: 'Выбирайте любого собеседника во флирте и ролке',
  },
  {
    id: STORAGE_KEYS.content.copyUnlocked,
    mainDescription: 'Отключить ограничения копирования текста',
    secondaryDescription: 'Копируйте текст в начале разговора, не дожидаясь истечения таймера',
  },
  {
    id: STORAGE_KEYS.ui.advices,
    mainDescription: 'Включить советы по безопасности',
    secondaryDescription: `Читайте cоветы на экране поиска диалога о том, как не попасть в 
                          неприятную ситуацию и что делать, если вы уже в ней оказались`,
    requiredContent: (adviceUrl) => (
      <p>
        Также с ними можно ознакомиться на этой{' '}
        <a href={adviceUrl} target='_blank'>
          странице
        </a>
      </p>
    ),
  },
];

export { switches };
