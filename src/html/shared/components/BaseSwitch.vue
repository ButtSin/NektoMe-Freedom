<script setup>
import { defineProps } from 'vue';

const { description, icon = null } = defineProps({
  description: {
    type: String,
    required: true,
  },
  icon: Object,
});
</script>

<template>
  <label class="switch">
    <div class="switch__controller">
      <span v-if="icon" class="switch__controller-icon" aria-hidden="true">{{ icon }}</span>
      <input class="switch__controller-input" type="checkbox" role="switch" />
    </div>
    <span class="switch__description"> {{ description }}</span>
  </label>
</template>

<style scoped lang="scss">
.switch {
  --switchControllerWidth: #{rem(32)};
  --switchControllerHeight: #{rem(16)};

  --switchInputThumbOffset: #{rem(2)};
  --switchInputIconOffset: calc(var(--switchInputThumbOffset) + #{rem(4)});

  display: flex;
  width: fit-content;
  align-items: center;
  column-gap: var(--spacing);

  cursor: pointer;

  &__controller {
    position: relative;

    display: flex;
    align-items: center;

    &-icon {
      position: absolute;
      top: 50%;
      left: 0;
      translate: var(--switchInputIconOffset) -50%;
      z-index: 1;

      display: flex;
      place-items: center;
      @include square(rem(8));

      transition-property: translate;
      transition-duration: var(--transition-duration);

      &:has(+ .switch__controller-input:checked) {
        translate: calc(var(--switchControllerWidth) - var(--switchInputIconOffset) - 100%) -50%;
      }
    }

    &-input {
      position: relative;

      width: var(--switchControllerWidth);
      height: var(--switchControllerHeight);

      border-radius: var(--border-radius-4xl);
      background-color: var(--color-default);

      appearance: none;
      cursor: pointer;

      transition-property: background-color, opacity;
      transition-duration: var(--transition-duration);

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        translate: var(--switchInputThumbOffset) -50%;

        content: '';
        width: rem(16);
        height: rem(12);

        border-radius: var(--border-radius-4xl);
        background-color: var(--color-snow);
        box-shadow: var(--box-shadow);

        transition-property: translate, box-shadow, opacity;
        transition-duration: var(--transition-duration);
      }

      @include hover(itself, after) {
        background-color: var(--color-default-hover);

        &:checked {
          background-color: var(--color-accent-hover);
        }
      }

      &:checked {
        background-color: var(--color-accent);

        &:active {
          background-color: colorToOpacity(var(--opacity), var(--color-accent));
        }

        &::before {
          translate: calc(var(--switchControllerWidth) - var(--switchInputThumbOffset) - 100%) -50%;

          box-shadow: var(--box-shadow-inner);
        }
      }

      &:active {
        background-color: colorToOpacity(var(--opacity), var(--color-default-hover));
      }

      &:focus-visible {
        outline: var(--outline);
        outline-offset: var(--outline-offset);
      }
    }
  }

  &__description {
    font-weight: 500;
    font-size: rem(14);
    color: var(--color-default-foreground);
    line-height: var(--line-height-xl-alt);

    user-select: none;

    transition-property: color;
    transition-duration: var(--transition-duration);
  }
}
</style>
