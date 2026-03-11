<script setup>
/*
TODO: При isDynamicParent=false и изменении масштаба контейнера, когда он был изначально без прокрутки,
а потом она появилась, тень не появляется сама по себе, пока не вызовется событие scroll. Исправить.

TODO: При isDynamicParent=true и изменении масштаба контейнера, когда он был изначально без прокрутки,
а потом она пропала, тень больше никогда не создаётся. Исправить.
TODO: При isDynamicParent=true и изменении масштаба контейнера, когда он был изначально с прокруткой,
а потом она пропала, тень не уничтожается. Исправить.

TODO: При переходе с компонента, у которого не было тени, туда, где она нужна, тень появляется с
проигрывающейся анимацией смены цвета.

TODO: При переходе со вкладки, отличной от настроек, обратно в них и последующей смене темы
редко бывает так, что тень начинает мерцать во время этого процесса. Или не тень, а вкладки?
 */

import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

import { useInitialTransition } from '@/html/shared/composables/useInitialTransition';

import { toUnit } from '@/js/utils/toUnit';
import { getCurrentDuration } from '@/js/utils/getCurrentDuration.js';
import TimingFunction from '@/js/utils/TimingFunction';
import Animation from '@/js/utils/Animation';

const {
  shadowHeight = 60,
  isDynamicParent = true,
  parentBackground,
} = defineProps({
  shadowHeight: Number,
  isDynamicParent: Boolean,
  parentBackground: String,
});

const shadowElement = useTemplateRef('shadowElement');
const parentElement = ref(null);
const parentElementVarsStyles = ref(null);
const parentEvents = ['scroll', 'click', 'keydown', 'keyup'];
let shadowAnimation = null;

const shouldRender = ref(true);

const updateShadowsOpacity = () => {
  const {
    scrollTop: parentElementScrollTop,
    scrollHeight: parentElementScrollHeight,
    clientHeight: parentElementClientHeight,
  } = parentElement.value;

  // if (parentElementScrollHeight === parentElementClientHeight && isDynamicParent) {
  //   shouldRender.value = false;

  //   parentElement.value.removeEventListener('scroll', updateShadowsOpacity);
  //   return;
  // }

  const shadowTopOpacity = Math.min(parentElementScrollTop / shadowHeight, 1);
  const shadowBottomOpacity = Math.min(
    (parentElementScrollHeight - parentElementClientHeight - parentElementScrollTop) / shadowHeight,
    1,
  );

  parentElementVarsStyles.value['--shadowTopOpacity'] = shadowTopOpacity;
  parentElementVarsStyles.value['--shadowBottomOpacity'] = shadowBottomOpacity;
};

const initParentEvents = () => {
  const transitionDuration = getCurrentDuration(parentElement.value);
  const timingFunctions = new TimingFunction();
  shadowAnimation = new Animation({
    duration: transitionDuration,
    timing: timingFunctions.linear,
    draw: updateShadowsOpacity,
  });

  for (let event of parentEvents) {
    if (event === 'scroll') {
      parentElement.value.addEventListener(event, updateShadowsOpacity);
      continue;
    }

    parentElement.value.addEventListener(event, shadowAnimation.animate);
  }

  updateShadowsOpacity();
};

const initParentStyles = () => {
  const parentElementStyles = getComputedStyle(parentElement.value);
  parentElementVarsStyles.value = {
    '--topOffset': toUnit({ value: parentElementStyles.paddingTop }),
    '--bottomOffset': toUnit({ value: parentElementStyles.paddingBottom }),
    '--leftOffset': toUnit({ value: parentElementStyles.paddingLeft }),
    '--rightOffset': toUnit({ value: parentElementStyles.paddingRight }),

    '--shadowHeight': toUnit({ value: shadowHeight, unit: 'rem' }),

    '--shadowBackground': parentBackground || parentElementStyles.backgroundColor,

    '--shadowTopOpacity': 1,
    '--shadowBottomOpacity': 1,
  };
};

const removeParentEvents = () => {
  for (let event of parentEvents) {
    if (event === 'scroll') {
      parentElement.value.removeEventListener(event, updateShadowsOpacity);
      continue;
    }

    parentElement.value.removeEventListener(event, shadowAnimation?.animate);
  }
};

const { isFirstUpdate, transitionClass, enableAnimations } = useInitialTransition({
  onDomReady: initParentEvents,
});

onMounted(() => {
  parentElement.value = shadowElement.value.parentElement;

  initParentStyles();

  if (isFirstUpdate.value) enableAnimations(shadowElement.value);
});

onUnmounted(() => {
  removeParentEvents();
});
</script>

<template>
  <div
    v-if="shouldRender"
    :class="transitionClass"
    class="shadow"
    ref="shadowElement"
    :style="parentElementVarsStyles"
  ></div>
</template>

<style scoped lang="scss">
@property --shadowBackground {
  syntax: '<color>';
  inherits: true;
  initial-value: transparent;
}

.shadow {
  position: sticky;
  top: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
  margin-top: -100%;

  pointer-events: none;

  &::before,
  &::after {
    position: absolute;
    left: calc(var(--leftOffset) * -1);
    right: calc(var(--rightOffset) * -1);

    content: '';
    height: var(--shadowHeight);

    transition-property: --shadowBackground;
    transition-duration: var(--transition-duration);
  }

  &::before {
    top: calc(var(--topOffset) * -1);

    opacity: var(--shadowTopOpacity);
    background: linear-gradient(0deg, transparent 0%, var(--shadowBackground) 100%);
  }

  &::after {
    bottom: calc(var(--bottomOffset) * -1);

    opacity: var(--shadowBottomOpacity);
    background: linear-gradient(180deg, transparent 0%, var(--shadowBackground) 100%);
  }
}
</style>
