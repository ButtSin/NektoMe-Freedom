<script setup>
const { size = '1rem' } = defineProps({ size: String });
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm1-9.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.25 3a.75.75 0 0 0-1.5 0V11a.75.75 0 0 0 1.5 0V8.5Z"
      clip-rule="evenodd"
    />
  </svg>
</template>

<style scoped lang="scss">
svg {
  transition-duration: var(--transition-duration);
}
</style>
