<script setup>
import { defineProps } from "vue";

const {
  mainDescription,
  isActive,
  secondaryDescription,
  icons = null,
  requiredContent,
  conditionalContent,
} = defineProps({
  mainDescription: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  secondaryDescription: String,
  icons: {
    type: Array,
    validator: (value) => {
      return Array.isArray(value) && value.length === 2;
    },
  },
  requiredContent: [String, Object],
  conditionalContent: [String, Object],
});
</script>

<template>
  <div class="switch">
    <label class="switch__controller">
      <div class="switch__controller-inner">
        <span v-if="icons" class="switch__icon" aria-hidden="true">
          <template v-if="isActive">
            {{ icons[0] }}
          </template>
          <template v-else>
            {{ icons[1] }}
          </template>
        </span>
        <input
          class="switch__input"
          type="checkbox"
          role="switch"
          :checked="isActive"
          :aria-checked="isActive"
        />

        <span class="switch__main-description">{{ mainDescription }}</span>
        <span v-if="secondaryDescription" class="switch__secondary-description">
          {{ secondaryDescription }}
        </span>
      </div>
    </label>
    <div
      v-if="
        $slots.required ||
        $slots.conditional ||
        requiredContent ||
        conditionalContent
      "
      class="switch__content"
    >
      <div v-if="$slots.required" class="switch__required-content">
        <slot name="required" />
      </div>
      <div
        v-else-if="typeof requiredContent === 'string'"
        v-html="requiredContent"
        class="switch__required-content"
      ></div>
      <component
        v-else-if="typeof requiredContent === 'object'"
        :is="requiredContent"
        class="switch__required-content"
      />

      <div v-if="$slots.conditional" class="switch__conditional-content">
        <slot name="conditional" />
      </div>
      <div
        v-else-if="typeof conditionalContent === 'string'"
        v-html="conditionalContent"
        class="switch__conditional-content"
      ></div>
      <component
        v-else-if="typeof conditionalContent === 'object'"
        :is="conditionalContent"
        class="switch__conditional-content"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.switch {
  --switchControllerWidth: #{rem(32)};
  --switchControllerHeight: #{rem(16)};

  --switchInputThumbOffset: #{rem(2)};
  --switchInputIconOffset: calc(var(--switchInputThumbOffset) + #{rem(4)});

  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  &__controller {
    @include hover(itself, after) {
      .switch__input {
        background-color: var(--color-default-hover);

        &:checked {
          background-color: var(--color-accent-hover);
        }
      }
    }

    &:active {
      .switch__input {
        background-color: colorToOpacity(
          var(--opacity),
          var(--color-default-hover)
        );
      }
      .switch__input:checked {
        background-color: colorToOpacity(var(--opacity), var(--color-accent));
      }
    }

    &-inner {
      position: relative;

      display: grid;
      grid-template-columns: var(--switchControllerWidth) 1fr;
      grid-template-rows: repeat(2, auto);
      align-items: center;
      justify-content: flex-start;
      column-gap: var(--spacing);
      grid-template-areas:
        "input main-description"
        ". secondary-description";

      cursor: pointer;
    }
  }

  &__icon {
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

    &:has(+ .switch__input:checked) {
      translate: calc(
          var(--switchControllerWidth) - var(--switchInputIconOffset) - 100%
        ) -50%;
    }
  }

  &__input {
    position: relative;

    width: var(--switchControllerWidth);
    height: var(--switchControllerHeight);
    grid-area: input;

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

      content: "";
      width: rem(16);
      height: rem(12);

      border-radius: var(--border-radius-4xl);
      background-color: var(--color-snow);
      box-shadow: var(--box-shadow);

      transition-property: translate, box-shadow, opacity;
      transition-duration: var(--transition-duration);
    }

    &:checked {
      background-color: var(--color-accent);

      &::before {
        translate: calc(
            var(--switchControllerWidth) - var(--switchInputThumbOffset) - 100%
          ) -50%;

        box-shadow: var(--box-shadow-inner);
      }
    }

    &:focus-visible {
      outline: var(--outline);
      outline-offset: var(--outline-offset);
    }

    &:active {
      background-color: colorToOpacity(
        var(--opacity),
        var(--color-default-hover)
      );

      &:checked {
        background-color: colorToOpacity(var(--opacity), var(--color-accent));
      }
    }
  }

  &__main-description,
  &__secondary-description {
    user-select: none;
  }

  &__main-description {
    grid-area: main-description;

    font-weight: 500;
    font-size: rem(14);
    color: var(--color-default-foreground);
    line-height: var(--line-height-xl-alt);

    transition-property: color;
    transition-duration: var(--transition-duration);
  }

  &__secondary-description {
    grid-area: secondary-description;

    font-weight: 400;
    font-size: rem(12);
    color: var(--color-muted);
    line-height: var(--line-height-lg-alt);

    transition-property: color;
    transition-duration: var(--transition-duration);
  }

  &__content {
    margin-left: calc(var(--switchControllerWidth) + var(--spacing));
  }

  &__required-content {
    transition-property: color;
    transition-duration: var(--transition-duration);
  }
}
</style>
