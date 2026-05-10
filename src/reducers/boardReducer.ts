import { BOARD_SIZE } from '../constants/constants'
import { getRandomInt, getRowColFromIndex, move } from '../utils/board-helpers'

export const boardReducer = (state: State, action: Action): State => {
  switch (action) {
    case 'reset': {
      const newBoard = [...emptyBoard]
      randomSpawn(newBoard, 'multi')
      return {
        ...state,
        board: newBoard,
      }
    }
    case 'move_left': {
      return {
        ...state,
        board: move(state.board),
      }
    }
    default:
      return state
  }
}

type State = {
  board: number[][]
}

type Action = 'reset' | 'move_up' | 'move_down' | 'move_left' | 'move_right'

const emptyBoard: number[][] = Array.from({ length: BOARD_SIZE }, () =>
  Array(BOARD_SIZE).fill(0),
)

const initialState: State = {
  board: emptyBoard,
}

const randomSpawn = (board: number[][], mode: 'single' | 'multi'): void => {
  const numSpawn = mode == 'single' ? 1 : getRandomInt(1, 5)
  const spawnIndices = Array.from({ length: numSpawn }, () =>
    getRandomInt(0, BOARD_SIZE * BOARD_SIZE - 1),
  )
  for (const i of spawnIndices) {
    const { row, col } = getRowColFromIndex(i)
    board[row][col] = 2
  }
}
