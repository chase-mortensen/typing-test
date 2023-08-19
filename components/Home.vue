<template>
  <StatsRow />

  <DropdownSelect
    class="pb-4"
    description="Test Duration"
    :options="durations"
    @setOption="(d) => testLength = d"
    v-show="timeLeft <= 0"
  />
  <TypeTest />
</template>

<script setup>
// import { reactive } from 'vue'

// const state = reactive({
//   testLength: 5,
//   timeLeft: 0
//  })
// const durations = [
//   {id: 30, name: '30 seconds'},
//   {id: 5, name: '5 seconds'},
//   {id: 60, name: '60 seconds'},
//   {id: 90, name: '90 seconds'},
//   {id: 120, name: '2 minutes'},
//   {id: 180, name: '3 minutes'},
// ]

// const currentString = getWordStrMaxLen(100)

// const durationString = computed(() => {
//   return durations.find(d => d.id === state.testLength)?.name
// })
</script>

<script>
  export default {
    data () {
      return {
        testLength: 5,
        timeLeft: 0,
        durations: [
          {id: 30, name: '30 seconds'},
          {id: 5, name: '5 seconds'},
          {id: 60, name: '60 seconds'},
          {id: 90, name: '90 seconds'},
          {id: 120, name: '2 minutes'},
          {id: 180, name: '3 minutes'},
      ]
      }
    },
    computed: {
      durationString () {
        return this.durations.find(d => d.id === this.testLength)?.name
      }
    }
  }
</script>

<style>

</style>