export const getWordStrMaxLen = (maxChars: number) => {
  let str = ""
  let word = ""
  do {
    word = getRandomWords()[0]
    if ((str.length + word.length + 1) <= maxChars) {
      str += " "
      str += word
    }
  } while ((str.length + word.length + 1) <= maxChars)
  return str
}