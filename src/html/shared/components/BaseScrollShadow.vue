<script setup>
/*
TODO: На основе isDynamicParent и shouldRender реализовать возможность добавлении тени так, чтобы
она могла быть удалена навсегда, если её контейнер не будет иметь скролла и не подразумевает
динамическое изменение контента.

TODO: События, навешанные на родительский контейнер тени и ответственные за проверку того, появился
ли у него скролл, не являются конечными и не отражают другие способы его добавления. Исправить
при появлении соответствующей потребности.

TODO: Тень хорошо интегрируется в контейнер с v-show. Нужно протестировать и адаптировать её и под
контейнер с v-if.

События, навешанные на родительский контейнер тени, отличные от scroll, вызывали множественный вызов
функции updateShadowsOpacity, что приводило к тому, что контейнер во время смены темы, согласно
devTools, получал корректный background, а фактически мог иметь либо переходное состояние между
тёмной и светлой темой, либо же вообще цвет противоположный от указанной темы. Почему так? Возможно,
большое количество вызовов updateShadowsOpacity приводило к пересчётом стилей/разметки, и это мешало
CSS-переходам. Точнее не скажу. Важнее то, что во время смены темы тень не реагирует на размеры
контейнера, а потом просто мгновенно подстраивается под них. По большей степени за те максимум
300 миллисекунд пользователь вряд ли сможет сильно далеко проскроллить контейнер после нажатия по
кнопке смены темы, либо ещё как-то спровоцировать её изменение, но всё же факт есть факт: пересчёт
opacity тени происходит мгновенно без плавных переходов. Пока это не проблема. Компромиссно можно
динамически вешать класс .hide во время перехода, а потом снимать его по завершению. Ещё проблема в
том, что очень редко, но всё равно встречается такое багованое поведение. Не знаю, как его 
исправить.
UPD: Хотя нет, даже без компонента тени происходит баг. И багуется не только фон, но и другие 
свойства. Самое лучшее решение - просто отключить анимации на время смены темы во всё приложении, 
а потом включить заново. Но, учитывая то, что он появляется крайне редко, а также тот факт,
что пользователи нечасто меняют тему, оставлю так. Потом, если что, можно снова потратить часов 20
на его поиски, начав с applyTheme в App.vue. 
*/

import { inject, nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';

import { useInitialTransition } from '@/html/shared/composables/useInitialTransition';

import { isThemeChangingProvide, THEME_TRANSITION_DURATION } from '@/js/constants.js';
import { toUnit } from '@/js/utils/toUnit';
import TimingFunction from '@/js/utils/TimingFunction';
import Animation from '@/js/utils/Animation';
import afterVisualUpdate from '@/js/utils/afterVisualUpdate';

const {
  shadowHeight = 60,
  isShow = true,
  isDynamicParent = true,
  parentBackground,
} = defineProps({
  shadowHeight: Number,
  isDynamicParent: Boolean,
  isShow: Boolean,
  parentBackground: String,
});
const isThemeChanging = inject(isThemeChangingProvide, ref(false));
const shadowElement = useTemplateRef('shadowElement');
const parentElementVarsStyles = ref(null);
const parentEvents = ['scroll', 'click', 'dblclick', 'keydown', 'keyup'];

let parentElement = null;
let parentEventsHandler = null;
let shadowAnimation = null;

const shouldRender = ref(true);

const updateShadowsOpacity = async () => {
  // if (parentElementScrollHeight === parentElementClientHeight && isDynamicParent) {
  //   shouldRender.value = false;

  //   parentElement.value.removeEventListener('scroll', updateShadowsOpacity);
  //   return;
  // }

  if (isThemeChanging.value) return;

  if (isFirstUpdate.value) {
    await afterVisualUpdate();
  } else {
    await nextTick();
  }

  if (isThemeChanging.value) return;

  const {
    scrollTop: parentElementScrollTop,
    scrollHeight: parentElementScrollHeight,
    clientHeight: parentElementClientHeight,
  } = parentElement;

  const shadowTopOpacity = Math.min(parentElementScrollTop / shadowHeight, 1);
  const shadowBottomOpacity = Math.min(
    (parentElementScrollHeight - parentElementClientHeight - parentElementScrollTop) / shadowHeight,
    1,
  );

  parentElementVarsStyles.value['--shadowTopOpacity'] = shadowTopOpacity;
  parentElementVarsStyles.value['--shadowBottomOpacity'] = shadowBottomOpacity;
};

const initParentEvents = () => {
  const timingFunctions = new TimingFunction();
  shadowAnimation = new Animation({
    duration: THEME_TRANSITION_DURATION,
    timing: timingFunctions.linear,
    draw: updateShadowsOpacity,
  });

  parentEventsHandler = (event) => {
    if (isThemeChanging.value) {
      return;
    }

    if (event.type === 'scroll') {
      updateShadowsOpacity();
    } else {
      shadowAnimation.stopAnimation();
      shadowAnimation.animate();
    }
  };

  for (let event of parentEvents) {
    parentElement.addEventListener(event, parentEventsHandler, { passive: true });
  }
};

const initParentStyles = () => {
  const parentElementStyles = getComputedStyle(parentElement);
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
  parentEvents.forEach((event) => {
    parentElement?.removeEventListener(event, parentEventsHandler);
  });
};

const { isFirstUpdate, transitionClass, enableAnimations } = useInitialTransition({
  onDomReady: initParentEvents,
});

onMounted(() => {
  parentElement = shadowElement.value.parentElement;

  initParentStyles();

  if (isFirstUpdate.value) {
    enableAnimations(shadowElement.value);
  }
});

onUnmounted(() => {
  removeParentEvents();
  shadowAnimation?.stopAnimation();
});

watch(
  () => isShow,
  () => {
    if (isShow) updateShadowsOpacity();
  },
);

watch(isThemeChanging, (isChanging) => {
  if (isChanging) {
    shadowAnimation?.cancel();
  } else {
    shadowAnimation.enable();
    shadowAnimation.animate();
  }
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
