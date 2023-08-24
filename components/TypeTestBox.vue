<template>
  <div class="overflow-hidden rounded-lg bg-white mb-5 px-4 py-5 shadow sm:p-6">
    <!-- <dt class="truncate text-sm font-medium text-gray-500">{{ item?.name }}</dt> -->
    <dd
      class="mt-1 min-w-full text-xl font-semibold tracking-tight text-gray-700 text-center">
      <span v-for="(wordObj, index) in currentRow">
        <span v-if="index === state.rowIndex" class="p-1 mr-1 bg-gray-200 rounded">{{ wordObj.word }}</span>
        <span v-else-if="wordObj.status === wordStatus.CORRECT" class="p-1 mr-1 rounded text-emerald-800 bg-emerald-200">{{ wordObj.word }}</span>
        <span v-else-if="wordObj.status === wordStatus.INCORRECT" class="p-1 mr-1 rounded text-red-800 bg-red-200">{{ wordObj.word }}</span>
        <span v-else class="p-1 mr-1 rounded">{{ wordObj.word }}</span>
      </span>
    </dd>
    <dd class="mt-1 text-xl font-semibold tracking-tight text-gray-400 text-center">
      <span v-for="wordObj in nextRow" class="p-1 rounded">{{ wordObj.word }}</span>
    </dd>
    </div>

  <!-- input for debugging/testing purposes -->
  <!-- (should be hidden in final iteration?) -->
  <!-- class="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" -->
  <div class="mb-5">
    <input
      v-model="state.input"
      :disabled="!props.active"
      type="text"
      name="input"
      id="input"
      class="nes-input"
      placeholder="type here..."
      @keydown.space="nextWord"
      @keydown.enter="nextWord"
      @keydown="isValidChar"
    />
  </div>
</template>

<script setup>
  const props = defineProps(['active'])
  const state = reactive({
    input: "",
    currentWordIndex: 0,
    currentTypingIndex: 0,
    rowIndex: 0,
  })

  const wordStatus = {
    INCORRECT: 0,
    CORRECT: 1,
    NA: 2
  }

  watch(() => props.active, async (isActive, prevState) => {
    if (isActive) {
      console.log('starting test')
      startTest()
    }
  })

  const startTest = () => {
    wordList = getRandomWords(900)
    wordObjList = wordList.map(w => {
      return {word: w, status: wordStatus.NA}
    })
    currentRow = getWordSubList()
    nextRow = getWordSubList()
  }

  const getWordSubList = () => {
    let wordObjSubList = []
    let strLength = 0
    let wordObj
    do {
      wordObj = wordObjList[state.currentWordIndex]
      console.log('wordObj: ', wordObj)
      if (wordObj === undefined) break
      if ((strLength + wordObj.word.length + 1) <= maxChars) {
        strLength += wordObj.word.length + 1
        wordObjSubList.push(wordObj)
        state.currentWordIndex++
      }
    } while ((strLength + wordObj.word.length + 1) <= maxChars)
    return wordObjSubList
  }


  const wordList = getRandomWords(900)
  let wordObjList = wordList.map(w => {
    return {word: w, status: wordStatus.NA}
  })
  const maxChars = 70

  let currentRow = getWordSubList()
  let nextRow = getWordSubList()



  const finishRow = () => { // this needs to move the next row to the current row
    currentRow = nextRow
    nextRow = getWordSubList()
    state.rowIndex = 0
    state.input = ""
  }

  const isValidChar = (e) => { // only allow alpha or alphanumeric input -
    // also limit to 20/25 chars
    e = (e) ? e : window.event;
    const charCode = (e.which) ? e.which : e.keyCode
    if ((charCode === 46 ||
      (charCode >= 48 || charCode <= 61) ||
      (charCode >= 65 || charCode <= 90)) && (state.input.length <= 20)) {
      return true
    } else if (state.input.length > 20){ // always allow space
      if (charCode === 8 || charCode === 13) {
        e.preventDefault()
      }
    }
    e.preventDefault()
  }

  const nextWord = (e) => { // on space key pressed, increment currentTypingIndex
    // and validate input and clear input
    console.log('space/enter pressed')
    const word = wordObjList[state.currentTypingIndex].word

    if (state.input.trim() === word) {
      wordObjList[state.currentTypingIndex].status = wordStatus.CORRECT
    } else {
      wordObjList[state.currentTypingIndex].status = wordStatus.INCORRECT
    }
    state.currentTypingIndex++
    state.rowIndex++

    state.input = ""
    if (state.rowIndex >= currentRow.length) {
      finishRow()
    }
  }

  const currentRowStr = computed(() => {
    if (currentRow.length) {
      return currentRow.join(' ')
    }
    return ''
  })

  const nextRowStr = computed(() => {
    if (nextRow.length) {
      return nextRow.join(' ')
    }
    return ''
  })
</script>

<style>

</style>
