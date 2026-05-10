import { createInitialState, move } from '../utils/board-helpers'

export const boardReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'reset': {
      return createInitialState()
    }
    case 'move': {
      const newBoard = move(state.board, action.direction)
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

export type Direction = 'up' | 'down' | 'left' | 'right'

type Action = { type: 'reset' } | { type: 'move'; direction: Direction }
