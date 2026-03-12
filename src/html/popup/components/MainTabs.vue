<script setup>
import { ref, watch } from 'vue';

import IconGear from '@/icons/IconGear.vue';
import IconInfo from '@/icons/iconInfo.vue';
import IconHeart from '@/icons/IconHeart.vue';

import settingsManager from '@/js/settingsManager';

import BaseTabs from '@/html/shared/components/BaseTabs.vue';
import TheSettings from '@/html/popup/components/Settings/TheSettings.vue';
import TheAbout from '@/html/popup/components/About/TheAbout.vue';
import TheHelp from '@/html/popup/components/Help/TheHelp.vue';

const tabs = [
  {
    id: 'settings',
    icon: IconGear,
    description: 'Настройки',
    panel: TheSettings,
  },
  {
    id: 'about',
    icon: IconInfo,
    description: 'О расширении',
    panel: TheAbout,
  },
  {
    id: 'help',
    icon: IconHeart,
    description: 'Помочь проекту',
    panel: TheHelp,
  },
];
const tabsKey = 'popupMainTabs';
const selectedTab = ref(null);

watch(
  () => settingsManager.getTabsState().value?.[tabsKey],
  (newVal) => {
    selectedTab.value = newVal;
  },
);

function updateSessionTabsState(selected) {
  settingsManager.setSessionTabsState(tabsKey, selected);
}
</script>

<template>
  <BaseTabs :tabs :selected="selectedTab" @update:selected="updateSessionTabsState" />
</template>

<style scoped lang="scss"></style>
