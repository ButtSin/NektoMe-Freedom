<script setup>
import BaseSwitch from '@/html/shared/components/BaseSwitch.vue';

const { switches } = defineProps({
  switches: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['update:checked']);
</script>

<template>
  <div class="switch-group">
    <BaseSwitch
      v-for="switchItem in switches"
      :key="switchItem.mainDescription"
      :mainDescription="switchItem.mainDescription"
      :secondaryDescription="switchItem.secondaryDescription"
      :isActive="switchItem.isActive"
      :icons="switchItem.icons"
      :requiredContent="switchItem.requiredContent"
      @update:checked="emit('update:checked', $event)"
    >
    </BaseSwitch>
  </div>
</template>

<style scoped lang="scss">
.switch-group {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing);
}
</style>
