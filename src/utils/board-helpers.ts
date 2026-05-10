import { BOARD_SIZE } from '../constants/constants'

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRowColFromIndex = (i: number): { row: number; col: number } => {
  const row = Math.floor(i / BOARD_SIZE)
  const col = i % BOARD_SIZE
  return { row, col }
}

export const move = (board: number[][]): number[][] => {
  console.log(board)
  return board.map((row) => {
    const newRow = []
    const filteredRow = row.filter((n) => n != 0)
    console.log(filteredRow)
    for (let i = 0; i < filteredRow.length; i++) {
      if (i < filteredRow.length - 1 && filteredRow[i] == filteredRow[i + 1]) {
        newRow.push(filteredRow[i] * 2)
        i++
      } else {
        newRow.push(filteredRow[i])
      }
    }
    while (newRow.length < BOARD_SIZE) {
      newRow.push(0)
    }
    return newRow
  })
}
