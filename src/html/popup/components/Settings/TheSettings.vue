<script setup>
import ThemeSwitcher from '@/html/popup/components/Settings/ThemeSwitcher.vue';
import SwitchGroup from '@/html/shared/components/SwitchGroup.vue';
import { computed } from 'vue';

const adviceUrl = computed(() => chrome.runtime.getURL('src/html/advices/index.html'));

const switches = [
  {
    mainDescription: 'Отключить ограничения выбора собеседников',
    secondaryDescription: 'Выбирайте собеседника любого пола во флирте и ролке',
    isActive: true,
  },
  {
    mainDescription: 'Отключить ограничения копирования текста',
    secondaryDescription: 'Копируйте текст в начале разговора, не дожидаясь истечения таймера',
    isActive: true,
  },
  {
    mainDescription: 'Включить советы',
    secondaryDescription: `Читайте cоветы на экране поиска диалога о том, как не попасть в 
                          неприятную ситуацию и что делать, если вы уже в ней оказались`,
    isActive: true,
    requiredContent: `Также с ними можно ознакомиться на этой 
      <a href="${adviceUrl.value}" target="_blank"> \
        странице
      </a>
      `,
  },
];
</script>

<template>
  <div class="settings">
    <SwitchGroup :switches />
    <ThemeSwitcher />
  </div>
</template>

<style scoped lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing);
}
</style>
