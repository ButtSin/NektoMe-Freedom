<script setup>
import ThemeSwitcher from '@/html/popup/components/Settings/ThemeSwitcher.vue';
import BaseSwitch from '@/html/shared/components/BaseSwitch.vue';
import { computed } from 'vue';

const adviceUrl = computed(() => chrome.runtime.getURL('src/html/advices/index.html'));

const switches = [
  {
    mainDescription: 'Отключить ограничения выбора собеседников',
    secondaryDescription: 'Выбирайте любого собеседника во флирте и ролке',
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
    requiredContent: `
    <p>Также с ними можно ознакомиться на этой 
      <a href="${adviceUrl.value}" target="_blank"> \
        странице
      </a>
    </p>`,
  },
];
</script>

<template>
  <div class="settings">
    <BaseSwitch
      v-for="switchItem in switches"
      :key="switchItem.mainDescription"
      :mainDescription="switchItem.mainDescription"
      :secondaryDescription="switchItem.secondaryDescription"
      :isActive="switchItem.isActive"
      :requiredContent="switchItem.requiredContent"
    >
    </BaseSwitch>
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
