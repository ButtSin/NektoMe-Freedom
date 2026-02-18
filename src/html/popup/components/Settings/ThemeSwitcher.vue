<script setup>
import RadioGroup from '@/html/shared/components/RadioGroup.vue';

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
      checked: true,
    },
  ],
};
</script>

<template>
  <RadioGroup v-bind="data" />
</template>

<style scoped lang="scss"></style>
