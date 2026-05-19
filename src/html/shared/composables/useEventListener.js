import { onMounted, onUnmounted, toValue } from "vue";

export function useEventListener(target, event, callback) {
  let element = null;

  onMounted(() => {
    element = toValue(target);

    if (!element) {
      throw new Error("Target-элемент не обнаружен или некорректен");
    }

    element.addEventListener(event, callback);
  });

  onUnmounted(() => {
    if (element) {
      element.removeEventListener(event, callback);
    }
  });
}
