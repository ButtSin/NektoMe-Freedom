<script setup>
import { computed, useId } from 'vue';
import RadioBase from './RadioBase.vue';

const { mainDescription, radios, name, selected, secondaryDescription } = defineProps({
  mainDescription: {
    type: String,
    required: true,
  },
  radios: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
  secondaryDescription: String,
});
const emit = defineEmits(['update:checked']);
const ariaDescriptionId = useId();
const radiosLength = computed(() => radios.length || 1);
</script>

<template>
  <fieldset
    class="radio-group"
    :aria-describedby="secondaryDescription ? ariaDescriptionId : undefined"
  >
    <legend class="radio-group__main-description">
      {{ mainDescription }}
    </legend>
    <p
      v-if="secondaryDescription"
      :id="ariaDescriptionId"
      class="radio-group__secondary-description"
    >
      {{ secondaryDescription }}
    </p>
    <div class="radio-group__radios" :style="{ '--gridColumns': radiosLength }">
      <RadioBase
        v-for="radio in radios"
        :key="radio.value"
        :value="radio.value"
        :checked="radio.value === selected"
        :name
        :mainDescription="radio.mainDescription"
        :secondary-description="radio.secondaryDescription"
        @update:checked="emit('update:checked', $event)"
      >
      </RadioBase>
    </div>
  </fieldset>
</template>

<style scoped lang="scss">
.radio-group {
  display: flex;
  flex-direction: column;

  &__main-description,
  &__secondary-description {
    transition-duration: var(--transition-duration);
  }

  &__main-description {
    font-weight: 500;
    font-size: rem(14);
    color: var(--color-default-foreground);
    line-height: var(--line-height-xl-alt);
  }

  &__secondary-description {
    font-weight: 400;
    font-size: rem(12);
    color: var(--color-muted);
    line-height: var(--line-height-lg-alt);
  }

  &__radios {
    display: grid;
    column-gap: var(--container-padding-x);
    grid-template-columns: repeat(var(--gridColumns), 1fr);
    padding-top: var(--spacing);
  }
}
</style>
