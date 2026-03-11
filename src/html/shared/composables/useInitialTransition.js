import { computed, ref, watch } from 'vue';
import afterVisualUpdate from '@/js/utils/afterVisualUpdate';

export function useInitialTransition({ targetElement, onDomReady } = {}) {
  const isFirstUpdate = ref(true);
  const isDomReady = ref(false);

  const enableAnimations = () => {
    afterVisualUpdate(() => {
      if (targetElement) targetElement.classList.remove('disable-animation');
      isFirstUpdate.value = false;
    });

    afterVisualUpdate(() => {
      isDomReady.value = true;
    });
  };

  if (targetElement) {
    return { isFirstUpdate, enableAnimations };
  }

  const transitionClass = computed(() => ({
    'disable-animation': isFirstUpdate.value,
  }));

  const stopWatch = watch(
    isDomReady,
    () => {
      if (!onDomReady) {
        stopWatch();
        return;
      }

      onDomReady();
    },
    { once: true },
  );

  return { isFirstUpdate, enableAnimations, transitionClass };
}
