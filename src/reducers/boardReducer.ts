import {
  createInitialState,
  move,
  randomSpawnInPlace,
} from '../utils/board-helpers'

export const boardReducer = (state: State, action: Action): State => {
  switch (action) {
    case 'reset': {
      return createInitialState()
    }
    case 'move_left': {
      const newBoard = move(state.board, 'left')
      randomSpawnInPlace(newBoard, 'single')
      return {
        ...state,
        board: newBoard,
      }
    }
    case 'move_right': {
      const newBoard = move(state.board, 'right')
      randomSpawnInPlace(newBoard, 'single')
      return {
        ...state,
        board: newBoard,
      }
    }
    case 'move_up': {
      const newBoard = move(state.board, 'up')
      randomSpawnInPlace(newBoard, 'single')
      return { ...state, board: newBoard }
    }
    case 'move_down': {
      const newBoard = move(state.board, 'down')
      randomSpawnInPlace(newBoard, 'single')
      return {
        ...state,
        board: newBoard,
      }
    }
    default:
      return state
  }
}

export type State = {
  board: number[][]
}

type Action = 'reset' | 'move_up' | 'move_down' | 'move_left' | 'move_right'
