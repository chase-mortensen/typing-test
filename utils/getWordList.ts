export const getWordList = (maxChars: number) => {
  let wordList = []
  let str = ""
  let word = ""
  do {
    word = getRandomWords()[0]
    if ((str.length + word.length + 1) <= maxChars) {
      str += " "
      str += word
      wordList.push(word)
    }
  } while ((str.length + word.length + 1) <= maxChars)
  return wordList
}