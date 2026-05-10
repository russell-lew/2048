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
