export const getRandomNumber = (length: number) => {
  return Math.floor(Math.random() * length)
}

export const createRandomIndexList = (arrayLength: number, limit: number) => {
  let randomArray = [] as number[]
  while (randomArray.length < limit) {
    let randomNumber = getRandomNumber(arrayLength)
    if (randomArray.indexOf(randomNumber) < 0) {
      randomArray.push(randomNumber)
    }
  }
  return randomArray
}