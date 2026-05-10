import { BOARD_SIZE } from '../constants/constants'
import type { State } from '../reducers/boardReducer'

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

const reverseInPlace = (m: number[][]) => {
  const size = m.length
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < Math.floor(size / 2); j++) {
      const targetIndex = size - 1 - j
      ;[m[i][j], m[i][targetIndex]] = [m[i][targetIndex], m[i][j]]
    }
  }
}

const transposeInPlace = (m: number[][]) => {
  const size = m.length
  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      ;[m[i][j], m[j][i]] = [m[j][i], m[i][j]]
    }
  }
}

export const move = (
  board: number[][],
  direction: 'up' | 'down' | 'left' | 'right',
): number[][] => {
  switch (direction) {
    case 'left': {
      return moveLeft(board)
    }
    case 'right': {
      const copy = board.map((row) => [...row])
      reverseInPlace(copy)
      const newBoard = moveLeft(copy)
      reverseInPlace(newBoard)
      return newBoard
    }
    case 'up': {
      const copy = board.map((row) => [...row])
      transposeInPlace(copy)
      const newBoard = moveLeft(copy)
      transposeInPlace(newBoard)
      return newBoard
    }
    case 'down': {
      const copy = board.map((row) => [...row])
      transposeInPlace(copy)
      reverseInPlace(copy)
      const newBoard = moveLeft(copy)
      reverseInPlace(newBoard)
      transposeInPlace(newBoard)
      return newBoard
    }
    default:
      return board
  }
}

const moveLeft = (board: number[][]): number[][] =>
  board.map((row) => {
    const newRow = []
    const filteredRow = row.filter((n) => n != 0)
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

export const randomSpawnInPlace = (
  board: number[][],
  mode: 'single' | 'multi',
): void => {
  const numSpawn = mode == 'single' ? 1 : getRandomInt(1, 5)
  const spawnIndices = Array.from({ length: numSpawn }, () =>
    getRandomInt(0, BOARD_SIZE * BOARD_SIZE - 1),
  )
  for (const i of spawnIndices) {
    const { row, col } = getRowColFromIndex(i)
    board[row][col] = 2
  }
}
const emptyBoard: number[][] = Array.from({ length: BOARD_SIZE }, () =>
  Array(BOARD_SIZE).fill(0),
)

export const createInitialState = (): State => {
  const newBoard = [...emptyBoard]
  randomSpawnInPlace(newBoard, 'multi')
  return {
    board: newBoard,
  }
}

export const initialState: State = {
  board: emptyBoard,
}
