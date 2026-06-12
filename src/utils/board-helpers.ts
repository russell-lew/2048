import {
  BOARD_SIZE,
  MAX_NEW_TILES,
  SPAWN_RATIO_2,
  WIN_CONDITION,
} from '../constants/constants'
import type { GameState, GameStatus } from '../reducers/boardReducer'

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomSpawnValue = (): number => {
  return Math.random() < SPAWN_RATIO_2 ? 2 : 4
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
): { newBoard: number[][]; didMove: boolean } => {
  switch (direction) {
    case 'left': {
      return moveLeft(board)
    }
    case 'right': {
      const copy = board.map((row) => [...row])
      reverseInPlace(copy)
      const { newBoard, didMove } = moveLeft(copy)
      reverseInPlace(newBoard)
      return { newBoard, didMove }
    }
    case 'up': {
      const copy = board.map((row) => [...row])
      transposeInPlace(copy)
      const { newBoard, didMove } = moveLeft(copy)
      transposeInPlace(newBoard)
      return { newBoard, didMove }
    }
    case 'down': {
      const copy = board.map((row) => [...row])
      transposeInPlace(copy)
      reverseInPlace(copy)
      const { newBoard, didMove } = moveLeft(copy)
      reverseInPlace(newBoard)
      transposeInPlace(newBoard)
      return { newBoard, didMove }
    }
    default:
      return { newBoard: board, didMove: false }
  }
}

const moveLeft = (
  board: number[][],
): { newBoard: number[][]; didMove: boolean } => {
  let didMove = false
  const newBoard = board.map((row) => {
    const newRow = moveRowLeft(row)
    const rowChanged = newRow.some((val, index) => val !== row[index])
    if (rowChanged) {
      didMove = true
    }
    return newRow
  })
  return { newBoard, didMove }
}

const moveRowLeft = (row: number[]) => {
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
}

export const randomSpawnInPlace = (
  board: number[][],
  mode: 'single' | 'multi' | 'block',
): void => {
  const emptyCells = getEmptyCells(board)
  if (emptyCells.length == 0) return

  const requestedSpawn =
    mode == 'single' ? 1 : mode == 'block' ? 1 : getRandomInt(1, MAX_NEW_TILES)
  const numSpawn = Math.min(requestedSpawn, emptyCells.length)

  for (let i = 0; i < numSpawn; i++) {
    const randomIdx = getRandomInt(0, emptyCells.length - 1)
    const [{ r, c }] = emptyCells.splice(randomIdx, 1)
    board[r][c] = mode == 'block' ? -1 : getRandomSpawnValue()
  }
}

const getEmptyCells = (board: number[][]): { r: number; c: number }[] => {
  const result: { r: number; c: number }[] = []
  board.forEach((row, r) => {
    row.forEach((_, c) => {
      if (board[r][c] == 0) {
        result.push({ r, c })
      }
    })
  })
  return result
}

export const createInitialState = (): GameState => {
  const emptyBoard: number[][] = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(0),
  )
  const newBoard = emptyBoard.map((row) => [...row])
  randomSpawnInPlace(newBoard, 'block')
  randomSpawnInPlace(newBoard, 'multi')
  return {
    status: 'playing',
    board: newBoard,
  }
}

export const getGameStatus = (board: number[][]): GameStatus => {
  if (hasWinningTile(board)) return 'win'
  if (getEmptyCells(board).length > 0) return 'playing'
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const current = board[row][col]
      if (col < BOARD_SIZE - 1 && current === board[row][col + 1]) {
        return 'playing'
      }
      if (row < BOARD_SIZE - 1 && current === board[row + 1][col]) {
        return 'playing'
      }
    }
  }
  return 'gameOver'
}

const hasWinningTile = (board: number[][]): boolean => {
  return board.some((row) => row.some((tile) => tile >= WIN_CONDITION))
}
