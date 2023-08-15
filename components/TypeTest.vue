<template>
  <StatBox :item="{name: countLabel, stat: timerDisplay}" />

  <!-- Display -->
  <ClientOnly>
    <TypeTestBox v-if="state.timeLeft > 0 || state.countdown > 0" :active="state.timeLeft > 0" />
  </ClientOnly>

  <button
    type="button"
    class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    @click="startCountdown()"
    >Start Test</button>
</template>

<script setup>
import { reactive } from 'vue'

const state = reactive({
  testLength: 5,
  timeLeft: 0,
  countdown: 0
})

const durations = [
  {id: 30, name: '30 seconds'},
  {id: 5, name: '5 seconds'},
  {id: 60, name: '60 seconds'},
  {id: 90, name: '90 seconds'},
  {id: 120, name: '2 minutes'},
  {id: 180, name: '3 minutes'},
]

const startCountdown = () => {
  state.countdown = 3
  const countdown = setInterval(function() {
    state.countdown -= 1;
    if (state.countdown <= 0) {
      state.countdown = 0
      clearInterval(countdown)
      console.log('countdown interval cleared')
      startTimer()
    }
  }, 1000);
}

const startTimer = () => {
  state.timeLeft = state.testLength
  const interval = 10
  const timer = setInterval(function() {
    state.timeLeft -= (interval/1000);
    if (state.timeLeft <= 0) {
      state.timeLeft = 0
      clearInterval(timer)
      console.log('interval cleared')
    }
  }, interval);
}

// const currentRow = getWordStrMaxLen(100)
// const nextRow = getWordStrMaxLen(100)

// const durationString = computed(() => {
//   return durations.find(d => d.id === state.testLength)?.name
// })

const countLabel = computed(() => {
  return state.timeLeft > 0 ? 'Time Remaining' : 'Starting In'
})

const timerDisplay = computed(() => {
  return state.timeLeft > 0 ? state.timeLeft.toFixed(2) : state.countdown.toFixed(0)
})
</script>

<style>

</style>