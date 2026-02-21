<script setup>
import IconLock from '@/icons/IconLock.vue';
import { onBeforeMount, watch } from 'vue';
import TheSettings from './components/TheSettings.vue';
import settingsManager from '@/js/SettingsManager';
import afterVisualUpdate from '@/js/utils/afterVisualUpdate';

onBeforeMount(async () => {
  await settingsManager.loadAllSettings();
});

watch(() => settingsManager.getTheme().value, applyTheme);

afterVisualUpdate(() => document.documentElement.classList.remove('disable-animation'), true);

function applyTheme(theme) {
  const htmlElement = document.documentElement;

  htmlElement.classList.remove('is-light', 'is-dark');

  switch (theme) {
    case 'light': {
      htmlElement.classList.add('is-light');

      break;
    }
    case 'dark': {
      htmlElement.classList.add('is-dark');

      break;
    }
    case 'system': {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlElement.classList.add(systemDark ? 'is-dark' : 'is-light');

      break;
    }
  }
}
</script>

<template>
  <header class="main__header header">
    <h1 class="header__title">
      <span class="header__title-text">NektoMe Freedom — говорите вне лимитов</span>
      &nbsp;
      <span class="header__title-icon">
        <IconLock />
      </span>
    </h1>
  </header>
  <main class="main">
    <TheSettings />
  </main>
</template>

<style scoped lang="scss">
.header {
  &__title {
    position: relative;

    display: flex;
    align-items: center;
    width: fit-content;

    &-text {
      hyphens: auto;

      transition-duration: var(--transition-duration);
    }

    &-icon {
      display: flex;
    }
  }
}
</style>
