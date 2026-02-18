<script setup>
import IconLock from '@/icons/IconLock.vue';
import { onMounted, ref, watch } from 'vue';
import TheSettings from './components/TheSettings.vue';
import settingsManager from '@/js/SettingsManager';

onMounted(async () => {
  await settingsManager.loadAllSettings();
});

watch(
  () => settingsManager.theme.value,
  (newTheme) => {
    const html = document.documentElement;
    html.classList.remove('is-light', 'is-dark');

    if (newTheme === 'light') {
      html.classList.add('is-light');
    } else if (newTheme === 'dark') {
      html.classList.add('is-dark');
    } else if (newTheme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.classList.add(systemDark ? 'is-dark' : 'is-light');
    }
  },
  { immediate: true },
);
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
