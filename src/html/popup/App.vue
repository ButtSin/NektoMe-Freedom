<script setup>
import BaseTabs from '@/components/BaseTabs.vue';
import IconLock from '@/icons/IconLock.vue';
import { ref } from 'vue';

const tabs = [
  { name: 'Settings', label: 'Настройки' },
  { name: 'About', label: 'О расширении' },
  { name: 'Help', label: 'Помочь проекту' },
];

const selectedTab = ref('Settings');

const changeTab = (tabName) => {
  selectedTab.value = tabName;
};
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
    <BaseTabs :names="tabs" :selectedTab="selectedTab" @changeTab="changeTab">
      <div v-if="selectedTab === 'Settings'">1</div>
      <div v-if="selectedTab === 'About'">2</div>
      <div v-if="selectedTab === 'Help'">3</div>
    </BaseTabs>
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
    }

    &-icon {
      display: flex;
    }
  }
}
</style>
