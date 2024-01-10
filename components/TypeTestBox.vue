<template>
  <div class="nes-container overflow-hidden bg-white mb-5 px-4 py-5 shadow sm:p-6">
    <!-- <dt class="truncate text-sm font-medium text-gray-500">{{ item?.name }}</dt> -->
    <dd
      class="mt-1 min-w-full text-sm font-semibold tracking-tight text-gray-700 text-center">
      <span v-for="(wordObj, index) in currentRow">
        <span v-if="index === rowIndex" class="p-1 mr-1 bg-gray-200 rounded">{{ wordObj.word }}</span>
        <span v-else-if="wordObj.status === wordStatus.CORRECT" class="p-1 mr-1 rounded text-emerald-800 bg-emerald-200">{{ wordObj.word }}</span>
        <span v-else-if="wordObj.status === wordStatus.INCORRECT" class="p-1 mr-1 rounded text-red-800 bg-red-200">{{ wordObj.word }}</span>
        <span v-else class="p-1 mr-1 rounded">{{ wordObj.word }}</span>
      </span>
    </dd>
    <dd class="mt-1 text-xs font-semibold tracking-tight text-gray-400 text-center">
      <span v-for="wordObj in nextRow" class="p-1 rounded">{{ wordObj.word }}</span>
    </dd>
    </div>

  <div class="mb-5">
    <input
      v-model="input"
      type="text"
      name="input"
      id="input"
      class="nes-input"
      placeholder="Press space to start"
      @keydown.space="nextWord"
      @keydown.enter="nextWord"
      @keydown="isValidChar"
    />
  </div>
</template>

<script>
const wordStatus = {
  INCORRECT: 0,
  CORRECT: 1,
  NA: 2
}

export default {
  name: 'TypeTestBox',
  props: {
    active: {
      type: Boolean
    }
  },
  data() {
    return {
      currentRow: null,
      nextRow: null,

      currentWordIndex: 0,
      currentTypingIndex: 0,
      rowIndex: 0,
      input: '',
      maxChars: 50,
      wordList: null,
    }
  },
  computed: {
    currentRowStr() {
      if (this.currentRow.length) {
        return this.currentRow.join(' ')
      }
      return ''
    },
    nextRowStr() {
      if (this.nextRow.length) {
        return this.nextRow.join(' ')
      }
      return ''
    },
    wordObjList() {
      return this.wordList?.map(w => {
        return {word: w, status: wordStatus.NA}
      }) ?? []
    }
  },
  methods: {
    finishRow() { // this needs to move the next row to the current row
      this.currentRow = this.nextRow
      this.nextRow = this.getWordSubList()
      this.rowIndex = 0
      this.input = ""
    },
    getWordSubList() {
      let wordObjSubList = []
      let strLength = 0
      let wordObj
      do {
        wordObj = this.wordObjList[this.currentWordIndex]
        console.log('wordObj: ', wordObj)
        if (wordObj === undefined) break
        if ((strLength + wordObj.word.length + 1) <= this.maxChars) {
          strLength += wordObj.word.length + 1
          wordObjSubList.push(wordObj)
          this.currentWordIndex++
        }
      } while ((strLength + wordObj.word.length + 1) <= this.maxChars)
      return wordObjSubList
    },
    isValidChar(e) { // only allow alpha or alphanumeric input -
      // also limit to 20/25 chars
      e = (e) ? e : window.Event;
      const charCode = (e.which) ? e.which : e.keyCode
      if ((charCode === 46 ||
        (charCode >= 48 || charCode <= 61) ||
        (charCode >= 65 || charCode <= 90)) && (this.input.length <= 20)) {
        return true
      } else if (this.input.length > 20){ // always allow space
        if (charCode === 8 || charCode === 13) {
          e.preventDefault()
        }
      }
      e.preventDefault()
    },
    nextWord (e) { // on space key pressed, increment currentTypingIndex
      // and validate input and clear input
      console.log('space/enter pressed')
      const word = this.wordObjList[this.currentTypingIndex].word

      if (this.input.trim() === word) {
        this.wordObjList[this.currentTypingIndex].status = wordStatus.CORRECT
      } else {
        this.wordObjList[this.currentTypingIndex].status = wordStatus.INCORRECT
      }
      this.currentTypingIndex++
      this.rowIndex++

      this.input = ""
      if (this.rowIndex >= this.currentRow.length) {
        this.finishRow()
      }
    },
    startTest() {
      this.wordList = getRandomWords(900)
      this.wordObjList = this.wordList?.map(w => {
        return {word: w, status: wordStatus.NA}
      }) ?? []
      this.currentRow = this.getWordSubList()
      this.nextRow = this.getWordSubList()
    }
  },
  watch: {
    active(newValue) {
      if (newValue) {
        console.log('starting test')
        this.startTest()
      }
    }
  },
  mounted() {
    this.currentRow = this.getWordSubList()
    this.nextRow = this.getWordSubList()
    this.wordList = getRandomWords(900)
  }
}
</script>

<style>

</style>
