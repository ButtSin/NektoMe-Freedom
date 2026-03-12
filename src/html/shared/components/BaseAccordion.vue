<script setup>
import { useId } from 'vue';

import IconCircleDashed from '@/icons/IconCircleDashed.vue';

const {
  title,
  content,
  name = '',
  open = false,
} = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String, Object],
    required: true,
  },
  name: String,
  icon: Object,
  open: Boolean,
});

const ariaDetailsId = useId();
</script>

<template>
  <details class="accordion" :name :open>
    <summary class="accordion__summary">
      <span class="accordion__summary-icon" aria-hidden="true">
        <component :is="icon ? icon : IconCircleDashed" />
      </span>
      <h3 class="accordion__summary-title">
        <span role="term" :aria-details="ariaDetailsId">{{ title }}</span>
      </h3>
    </summary>
    <div class="accordion__content" :id="ariaDetailsId" role="definition">
      <div
        v-if="typeof content === 'string'"
        v-html="content"
        class="accordion__content-inner"
      ></div>
      <component v-else :is="content" />
    </div>
  </details>
</template>

<style scoped lang="scss">
.accordion {
  --accordionMainIconSize: #{rem(16)};
  --accordionArrowIconOffsetRight: #{rem(16)};
  --accordionPaddingRight: calc(
    var(--accordionMainIconSize) + var(--accordionArrowIconOffsetRight) + #{rem(8)}
  );

  @include separator-line($side: bottom);

  &::details-content {
    block-size: 0;

    overflow: hidden;
    interpolate-size: allow-keywords;
    opacity: 0;

    transition-behavior: allow-discrete;
    transition-property: block-size, content-visibility, opacity;
    transition-duration: var(--transition-duration);
  }

  &[open] {
    &::details-content {
      block-size: auto;

      opacity: 1;
    }

    .accordion__summary {
      &::after {
        rotate: -180deg;
      }
    }
  }

  &:not([open]) {
    .accordion__summary:hover {
      @include hover(itself) {
        background-color: var(--color-default);
      }
    }
  }

  &__summary {
    position: relative;

    display: flex;
    padding-block: var(--accordionMainIconSize);

    cursor: pointer;
    user-select: none;

    transition-property: background-color;
    transition-duration: var(--transition-duration);

    &::after {
      position: absolute;
      right: var(--accordionArrowIconOffsetRight);

      content: '';
      @include square(var(--accordionMainIconSize));

      mask: url('@/icons/arrow.svg') no-repeat center / contain;
      background-color: var(--color-muted);

      transition-property: rotate;
      transition-duration: var(--transition-duration);
    }

    &:focus-visible {
      z-index: 1;

      outline: var(--outline);
      outline-offset: rem(2);
    }

    &-icon {
      display: flex;
      place-items: center;
    }

    &-title {
      padding-left: rem(12);
      padding-right: var(--accordionPaddingRight);

      font-size: rem(14);
      font-weight: 500;
      line-height: var(--line-height-xl-alt);
      color: var(--color-default-foreground);

      transition-property: color;
      transition-duration: var(--transition-duration);
    }
  }

  &__content {
    padding-left: calc(var(--accordionMainIconSize) + rem(12));
    padding-right: var(--accordionPaddingRight);
    padding-bottom: rem(16);
  }
}
</style>
