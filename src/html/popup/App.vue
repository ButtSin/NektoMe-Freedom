<script setup>
import { onBeforeMount, watch } from 'vue';

import IconLock from '@/icons/IconLock.vue';

import settingsManager from '@/js/settingsManager';
import { useInitialTransition } from '@/html/shared/composables/useInitialTransition';

import MainTabs from '@/html/popup/components/MainTabs.vue';

const { isFirstUpdate, enableAnimations } = useInitialTransition(document.documentElement);

onBeforeMount(async () => {
  await settingsManager.loadAllLocalSettings();
  await settingsManager.initSessionTabsState();
});

watch(() => settingsManager.getTheme().value, applyTheme);

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

  if (isFirstUpdate.value) enableAnimations();
}
</script>

<template>
  <header class="popup__header header">
    <h1 class="header__title">
      <span class="header__title-text">NektoMe Freedom — говорите вне лимитов</span>
      &nbsp;
      <span class="header__title-icon">
        <IconLock />
      </span>
    </h1>
  </header>
  <main class="popup__main main">
    <MainTabs />
  </main>
</template>

<style scoped lang="scss">
.popup__header {
  margin-bottom: var(--spacing-xs);
}

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
