<script setup>
import { computed, useTemplateRef } from 'vue';

const { id, selected, description, icon } = defineProps({
  id: {
    type: Number,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: Object,
});
const emit = defineEmits('update:selected');

const buttonElement = useTemplateRef('buttonElement');

const isActive = computed(() => id === selected);

defineExpose({ buttonElement, isActive, id });
</script>

<template>
  <button
    :id
    class="button reset-button"
    :class="{ 'is-active': isActive }"
    type="button"
    @click="emit('update:selected', id)"
    ref="buttonElement"
    :tabIndex="isActive ? 0 : -1"
    :aria-controls="`tabpanel-${id}`"
    :aria-selected="isActive"
    role="tab"
  >
    <component :is="icon" class="button__icon"></component>

    <p class="button__description">
      {{ description }}
    </p>
  </button>
</template>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  padding: rem(6) rem(12);
  gap: rem(6);

  color: var(--color-muted);

  user-select: none;
  cursor: pointer;

  transition-duration: var(--transition-duration);

  @include hover(itself) {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }

  &.is-active {
    color: var(--color-default-foreground);

    cursor: default;

    @include hover {
      opacity: 1;
    }
  }

  &__description {
    font-size: rem(14);
    font-weight: 500;
    line-height: var(--line-height-xl-alt);
  }
}
</style>
