<script setup>
const { value, name, mainDescription, secondaryDescription, checked } = defineProps({
  value: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mainDescription: {
    type: String,
    required: true,
  },
  secondaryDescription: String,
  checked: Boolean,
});
</script>

<template>
  <label class="radio">
    <input class="radio__control" type="radio" :value :name :checked />
    <div class="radio__descriptions">
      <span class="radio__main-description">{{ mainDescription }}</span>
      <span v-if="secondaryDescription" class="radio__secondary-description">
        {{ secondaryDescription }}
      </span>
    </div>
  </label>
</template>

<style scoped lang="scss">
.radio {
  display: flex;
  gap: rem(12);

  cursor: pointer;

  @include ensure-click-area(null);

  &__control {
    position: relative;

    display: flex;
    margin-top: rem(2);
    @include square(rem(16));

    border: var(--border-field);
    box-shadow:
      0 0 rem(1) 0 var(--color-field-shadow-alt),
      0 rem(1) rem(2) 0 var(--color-field-shadow-alt),
      0 rem(2) rem(4) 0 var(--color-field-shadow),
      inset 0 0 0 0 rgba(255, 255, 255, 0.1);
    background: var(--color-field-background);
    border-radius: 50%;

    appearance: none;

    transition-property: background-color, border, box-shadow;
    transition-duration: var(--transition-duration);

    &::before {
      @include abs-center;

      content: '';
      @include square(100%);

      border-radius: 50%;
      border: 0 solid transparent;

      transition-duration: var(--transition-duration);
    }

    &::after {
      @include abs-center;

      content: '';
      @include square(rem(0));

      border-radius: 50%;
      box-shadow: 0 rem(1) rem(1) 0 rgba(0, 0, 0, 0.05);
      background-color: var(--color-snow);

      transition-duration: var(--transition-duration);
    }

    @include hover(innerElements) {
      border: var(--border-field-hover);
      background-color: var(--color-field-background-hover);

      &:checked::before {
        background-color: var(--color-accent-hover);
      }
    }

    &:focus-visible {
      outline: var(--outline);
      outline-offset: rem(2);
      box-shadow: none;

      transition-property: background-color, border-color;
    }

    &:checked,
    &:active {
      border-width: rem(2);
      border-color: var(--color-accent);
      box-shadow: 0 rem(1) rem(2) 0 rgba(0, 0, 0, 0.05);
    }

    &:checked {
      border: rem(1) solid var(--color-accent-hover);
      background-color: transparent;
    }

    &:checked::before {
      z-index: -1;

      @include square(rem(16));

      background-color: var(--color-accent);
    }

    &:checked::after {
      @include square(rem(6));
    }

    &:checked:active::after {
      @include square(rem(8));
    }
  }

  &__descriptions {
    display: flex;
    flex-direction: column;

    user-select: none;
  }

  &__secondary-description {
    font-weight: 400;
    font-size: rem(12);
    color: var(--color-muted);
    line-height: var(--line-height-lg-alt);
  }

  &__main-description {
    font-weight: 500;
    font-size: rem(14);
    color: var(--color-default-foreground);
    line-height: var(--line-height-xl-alt);
  }
}
</style>
