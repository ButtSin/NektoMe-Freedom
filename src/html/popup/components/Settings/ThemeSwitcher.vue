<script setup>
import RadioGroup from '@/html/shared/components/RadioGroup.vue';
import settingsManager from '@/js/SettingsManager';
import { ref, watch } from 'vue';

const data = {
  mainDescription: 'Тема',
  secondaryDescription: 'Выберите тему оформления',
  name: 'theme',
  radios: [
    {
      mainDescription: 'Светлая',
      value: 'light',
    },
    {
      mainDescription: 'Тёмная',
      value: 'dark',
    },
    {
      mainDescription: 'Системная',
      value: 'system',
    },
  ],
};

const selectedTheme = ref('');
watch(
  () => settingsManager.getTheme().value,
  (newVal) => {
    selectedTheme.value = newVal;
  },
  { immediate: true },
);

function updateLocalTheme(theme) {
  settingsManager.setLocalTheme(theme);
}
</script>

<template>
  <RadioGroup v-bind="data" :selected="selectedTheme" @update:checked="updateLocalTheme" />
</template>

<style scoped lang="scss"></style>
