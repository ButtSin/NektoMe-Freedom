<script setup>
const { size = "1rem" } = defineProps({ size: String });
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path
      fill="#18181B"
      fill-rule="evenodd"
      d="M1.63 2.8a4.11 4.11 0 0 1 3.13-1.3c1.16 0 2.4.55 3.24 1.62a4.13 4.13 0 0 1 3.24-1.62c1.27 0 2.36.46 3.12 1.3A4.7 4.7 0 0 1 15.5 6c0 2.17-1.11 3.91-2.52 5.27a19.96 19.96 0 0 1-4.64 3.14.75.75 0 0 1-.69 0 20.37 20.37 0 0 1-4.63-3.14C1.6 9.93.5 8.2.5 6.01A4.7 4.7 0 0 1 1.63 2.8Zm1.11 1C2.3 4.3 2 5.06 2 6.02c0 1.63.82 3 2.06 4.19 1.14 1.1 2.6 1.98 3.94 2.7 1.34-.7 2.8-1.6 3.94-2.7C13.18 9 14 7.61 14 6a3.2 3.2 0 0 0-.74-2.2C12.8 3.3 12.14 3 11.24 3c-.98 0-2.1.63-2.53 1.95a.75.75 0 0 1-1.42 0A2.72 2.72 0 0 0 4.76 3c-.9 0-1.57.31-2.02.8Z"
      clip-rule="evenodd"
    />
  </svg>
</template>

<style scoped lang="scss">
svg {
  transition-duration: var(--transition-duration);
}
</style>
