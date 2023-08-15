<template>
  <div>
    <!-- <h3 class="text-lg font-medium leading-6 text-gray-900">Typing Stats</h3> -->
    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
      <StatBox v-for="item in stats" :key="item.name" :item="item" />
    </dl>
  </div>
</template>

<script setup>

const stats = [
  { name: 'WPM', stat: '70' },
  { name: 'Errors', stat: '4' },
  { name: 'Accuracy', stat: '95.64%' },
  { name: 'CPM', stat: '420' },
]
</script>