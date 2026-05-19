import { computed, ref, watch } from "vue";
import afterVisualUpdate from "@/js/utils/afterVisualUpdate";

export function useInitialTransition({ targetElement, onDomReady } = {}) {
  const isFirstUpdate = ref(true);
  const isDomReady = ref(false);

  const enableAnimations = async () => {
    await afterVisualUpdate(() => {
      if (targetElement) targetElement.classList.remove("disable-animation");
      isFirstUpdate.value = false;
    });

    await afterVisualUpdate(() => {
      isDomReady.value = true;
    });
  };

  const transitionClass = computed(() => ({
    "disable-animation": isFirstUpdate.value,
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

  if (targetElement) {
    return { isFirstUpdate, enableAnimations };
  }

  return { isFirstUpdate, enableAnimations, transitionClass };
}
