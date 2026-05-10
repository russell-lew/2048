import { createInitialState, move } from '../utils/board-helpers'

export const boardReducer = (state: State, action: Action): State => {
  switch (action) {
    case 'reset': {
      return createInitialState()
    }
    case 'move_left': {
      return {
        ...state,
        board: move(state.board, 'left'),
      }
    }
    case 'move_right': {
      return {
        ...state,
        board: move(state.board, 'right'),
      }
    }
    case 'move_up': {
      return {
        ...state,
        board: move(state.board, 'up'),
      }
    }
    case 'move_down': {
      return {
        ...state,
        board: move(state.board, 'down'),
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
