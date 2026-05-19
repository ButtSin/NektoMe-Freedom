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
      fill="#18181b"
      fill-rule="evenodd"
      d="M12 3.5H4c-.8284 0-1.5.6716-1.5 1.5v6c0 .8284.6716 1.5 1.5 1.5h8c.8284 0 1.5-.6716 1.5-1.5V5c0-.8284-.6716-1.5-1.5-1.5M4 2C2.3432 2 1 3.3432 1 5v6c0 1.6569 1.3432 3 3 3h8c1.6569 0 3-1.3431 3-3V5c0-1.6568-1.3431-3-3-3zm.4697 8.5303a.75.75 0 0 1 0-1.0606L5.9393 8 4.4697 6.5303a.75.75 0 0 1 1.0606-1.0606l2 2a.75.75 0 0 1 0 1.0606l-2 2a.75.75 0 0 1-1.0606 0M8.75 9.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
      clip-rule="evenodd"
    />
  </svg>
</template>
<style scoped lang="scss"></style>
