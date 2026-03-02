import { computed, ref } from 'vue';
import afterVisualUpdate from '@/js/utils/afterVisualUpdate';

export function useInitialTransition(targetElement) {
  const isFirstUpdate = ref(true);

  const enableAnimations = () => {
    afterVisualUpdate(() => {
      isFirstUpdate.value = false;

      if (targetElement) {
        targetElement.classList.remove('disable-animation');
      }
    });
  };

  if (targetElement) {
    return { isFirstUpdate, enableAnimations };
  }

  const transitionClass = computed(() => ({
    'disable-animation': isFirstUpdate.value,
  }));

  return { isFirstUpdate, enableAnimations, transitionClass };
}
