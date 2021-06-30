/**
 * 0 ~ 입력받은 숫자까지의 random 숫자를 추출하기 위한 함수
 * @param length
 */
export const getRandomNumber = (length: number) => {
  return Math.floor(Math.random() * length)
}

/**
 * 총 구멍 수를 입력 받아 두더지를 보여줄 구멍의 index 를 랜덤으로 정하기 위한 함수
 * @param arrayLength : number  // 총 구멍 수
 * @param limit : number        // 총 두더지 수
 */
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