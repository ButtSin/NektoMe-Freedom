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

const emit = defineEmits(['update:checked']);
</script>

<template>
  <label class="radio">
    <input
      class="radio__control"
      type="radio"
      :value
      :name
      :checked
      @change="emit('update:checked', value)"
    />
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
  --controlSize: #{rem(16)};

  display: flex;
  gap: rem(12);

  cursor: pointer;

  @include ensure-click-area(null);

  transition: initial;

  &__control {
    position: relative;

    display: flex;
    margin-top: rem(2);
    @include square(var(--controlSize));

    outline: var(--border-field);
    outline-offset: calc(var(--border-width) * -1);
    box-shadow: var(--box-shadow);
    background: var(--color-field-background);
    border-radius: 50%;

    appearance: none;
    cursor: pointer;

    transition-property: background-color, outline-color, box-shadow;
    transition-duration: var(--transition-duration);

    &::before,
    &::after {
      @include abs-center;

      content: '';
      @include square(var(--controlSize));
    }

    &::before {
      border-radius: 50%;

      transition-duration: var(--transition-duration);
    }

    &::after {
      scale: 0;

      border-radius: 50%;
      box-shadow: 0 rem(1) rem(1) 0 rgba(0, 0, 0, 0.05);
      background-color: var(--color-snow);

      transition-duration: var(--transition-duration);
    }

    @include hover {
      outline-color: var(--color-border-hover);
      background-color: var(--color-field-background-hover);

      &:checked::before {
        background-color: var(--color-accent-hover);
      }
    }

    &:checked,
    &:active {
      outline-color: transparent;
      box-shadow: var(--box-shadow);
    }

    &:checked {
      background-color: transparent;
      box-shadow: var(--box-shadow-alt);

      &::before {
        z-index: -1;

        @include square(rem(16));
        background-color: var(--color-accent);
      }

      &::after {
        @include scale-to-size(var(--controlSize), rem(6));
      }
    }

    &:checked:active::after {
      @include scale-to-size(var(--controlSize), rem(8));
    }

    &:focus-visible {
      outline: var(--outline);
      outline-offset: var(--outline-offset);
      box-shadow: none;

      transition: none;
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

    transition-duration: var(--transition-duration);
  }

  &__main-description {
    font-weight: 500;
    font-size: rem(14);
    color: var(--color-default-foreground);
    line-height: var(--line-height-xl-alt);

    transition-duration: var(--transition-duration);
  }
}
</style>
