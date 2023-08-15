<template>
  <StatsRow />

  <DropdownSelect
    class="pb-4"
    description="Test Duration"
    :options="durations"
    @setOption="(d) => state.testLength = d"
    v-show="state.timeLeft <= 0"
  />

  <!-- <p class="pb-4">Test duration: {{ durationString }}</p> -->

  <TypeTest />

  <!-- <p class="pb-4">{{ currentString }} {{ currentString.length }}</p> -->

</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  testLength: 5,
  timeLeft: 0
 })
const durations = [
  {id: 30, name: '30 seconds'},
  {id: 5, name: '5 seconds'},
  {id: 60, name: '60 seconds'},
  {id: 90, name: '90 seconds'},
  {id: 120, name: '2 minutes'},
  {id: 180, name: '3 minutes'},
]

const currentString = getWordStrMaxLen(100)

const durationString = computed(() => {
  return durations.find(d => d.id === state.testLength)?.name
})
</script>

<style>

</style>