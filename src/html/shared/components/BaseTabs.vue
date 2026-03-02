<script setup>
import ButtonTabs from '@/html/shared/components/ButtonTabs.vue';
import { nextTick, ref, useTemplateRef, watch } from 'vue';
import { useInitialTransition } from '@/html/shared/composables/useInitialTransition';

const { tabs, selected } = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
});
const emit = defineEmits('update:selected');
const buttonComponents = useTemplateRef('buttons');
const statusElement = useTemplateRef('statusElement');
const statusStyle = ref(null);
const { isFirstUpdate, transitionClass, enableAnimations } = useInitialTransition();
const getActiveButtonComponent = () =>
  buttonComponents.value?.find((component) => component.isActive);

const updateStatus = async () => {
  await nextTick();

  const activeButtonComponent = getActiveButtonComponent();
  const buttonElement = activeButtonComponent.buttonElement;
  const buttonElementStyles = getComputedStyle(buttonElement);
  const buttonElementSize = {
    width: buttonElementStyles.width,
    height: buttonElementStyles.height,
  };

  const statusElementStyles = getComputedStyle(statusElement.value);
  const statusPaddingLeft = parseFloat(statusElementStyles.paddingLeft);

  statusStyle.value = {
    ...statusStyle.value,
    ...buttonElementSize,
    left: buttonElement.offsetLeft - statusPaddingLeft + 'px',
  };

  if (isFirstUpdate.value) enableAnimations();
};

const handleKeyDown = (event) => {
  const { key } = event;

  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) return;

  event.preventDefault();

  const activeButtonIndex = buttonComponents.value.findIndex((component) => component.isActive);
  const lastButtonIndex = buttonComponents.value.length - 1;
  let newButtonIndex = activeButtonIndex;

  switch (key) {
    case 'ArrowLeft': {
      newButtonIndex = activeButtonIndex === 0 ? lastButtonIndex : activeButtonIndex - 1;
      break;
    }
    case 'ArrowRight': {
      newButtonIndex = activeButtonIndex === lastButtonIndex ? 0 : activeButtonIndex + 1;
      break;
    }
    case 'Home': {
      newButtonIndex = 0;
      break;
    }
    case 'End': {
      newButtonIndex = lastButtonIndex;
      break;
    }
  }

  if (newButtonIndex !== activeButtonIndex) {
    const newActiveButtonId = buttonComponents.value[newButtonIndex].id;

    emit('update:selected', newActiveButtonId);

    buttonComponents.value[newButtonIndex].buttonElement.focus();
  }
};

watch(() => selected, updateStatus);
</script>

<template>
  <section class="tabs" :class="transitionClass">
    <h2 class="visually-hidden" id="settings-sections">Навигация по расширению</h2>
    <header class="tabs__header" data-js-tabs-navigation @keydown="handleKeyDown">
      <div
        class="tabs__buttons"
        role="tablist"
        aria-orientation="horizontal"
        aria-labelledby="settings-sections"
      >
        <ButtonTabs
          v-for="tab in tabs"
          :key="tab.id"
          :description="tab.description"
          :id="tab.id"
          :icon="tab.icon"
          :selected
          ref="buttons"
          @update:selected="emit('update:selected', $event)"
        />
        <div class="tabs__buttons-status" ref="statusElement" :style="statusStyle"></div>
      </div>
    </header>
    <div class="tabs__body">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :id="`tabpanel-${tab.id}`"
        class="tabs__content"
        role="tabpanel"
        :aria-labelledby="tab.id"
        tabindex="0"
        :style="{ display: selected === tab.id ? null : 'none' }"
      >
        <!--  
          В связи с тем, что остальные вкладки будут использовать гораздо реже, я принял решение
          не рендерить их, использовав v-if вместо v-show
        -->
        <keep-alive>
          <component v-if="selected === tab.id" :is="tab.panel" />
        </keep-alive>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tabs {
  &__header {
    margin-bottom: var(--container-padding-y);
  }

  &__buttons {
    position: relative;
    z-index: 0;

    display: flex;
    gap: rem(5);
    justify-content: space-between;
    padding: rem(4) rem(8);

    border-radius: rem(28);
    background-color: var(--color-default);

    transition-property: background-color;
    transition-duration: var(--transition-duration);

    &:has(button:focus-visible) {
      .tabs__buttons-status {
        outline: var(--outline);
        outline-offset: rem(2);
        box-shadow: none;
      }
    }

    &-status {
      position: absolute;
      top: 50%;
      left: 0;
      translate: 0 -50%;
      z-index: -1;

      content: '';
      box-sizing: content-box;
      padding-inline: rem(4);

      border-radius: var(--border-radius-4xl);
      background-color: var(--color-segment);
      box-shadow: 0 rem(2) rem(8) 0 var(--color-field-shadow-alt);

      /*
        При более производительной анимации через scaleX не меняется border-radius, так что
        приходится работать с width.
      */
      will-change: width, left;
      transform-origin: left;

      transition-duration: var(--transition-duration);
      transition-property: width, left, background-color;
    }
  }

  &__body {
    padding-inline: rem(4);
  }

  &__content {
    position: relative;
    z-index: 0;

    padding: rem(12);

    border-radius: var(--border-radius-xl);
    background-color: var(--color-field-background);

    transition-property: background-color;
    transition-duration: var(--transition-duration);

    &:focus-visible {
      outline-offset: rem(2);
      outline: var(--outline);
    }
  }
}
</style>
