<script setup>
import ThemeSwitcher from '@/html/popup/components/Settings/ThemeSwitcher.vue';
import BaseSwitch from '@/html/shared/components/BaseSwitch.vue';
</script>

<template>
  <div class="settings">
    <BaseSwitch description="Отключить ограничения выбора собеседников" />
    <BaseSwitch description="Отключить ограничения копирования текста" />
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
