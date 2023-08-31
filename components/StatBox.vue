<template>
  <div class="nes-container overflow-hidden bg-white mb-5 px-4 py-5 shadow sm:p-6">
    <dt class="truncate text-xs font-medium text-gray-500">{{ item?.name }}</dt>
    <dd class="mt-1 text-xl font-semibold tracking-tight text-gray-900">{{ item?.stat }}</dd>
  </div>
</template>

<script setup>
  const props = defineProps(['item'])
</script>

<style lang="scss" scoped>
</style>
