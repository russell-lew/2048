import {
  createInitialState,
  isGameOver,
  move,
  randomSpawnInPlace,
} from '../utils/board-helpers'

export const boardReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'reset': {
      return createInitialState()
    }
    case 'move': {
      const newBoard = move(state.board, action.direction)
      randomSpawnInPlace(newBoard, 'single')
      return {
        ...state,
        board: newBoard,
      }
    }
    case 'check': {
      return {
        ...state,
        status: isGameOver(state.board) ? 'gameOver' : 'playing',
      }
    }
    default:
      return state
  }
}

export type GameState = {
  board: number[][]
  status: 'playing' | 'gameOver' | 'win'
}

export type Direction = 'up' | 'down' | 'left' | 'right'

type Action =
  | { type: 'reset' }
  | { type: 'move'; direction: Direction }
  | { type: 'check' }
