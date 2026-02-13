<script setup>
const { names, selectedTab } = defineProps({
  names: {
    type: Array,
    required: true,
  },
  selectedTab: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['changeTab']);

const clickOnTab = (tabName) => {
  emit('changeTab', tabName);
};
</script>

<template>
  <div class="tab-nav">
    <span
      v-for="tab in names"
      :key="tab.name"
      :class="['tab-nav__label', { selected: tab.name === selectedTab }]"
      @click="clickOnTab(tab.name)"
    >
      {{ tab.label }}
    </span>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.selected {
  font-size: 30px;
}
</style>
