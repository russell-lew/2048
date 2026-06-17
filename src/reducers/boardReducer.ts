import {
  createInitialState,
  getGameStatus,
  move,
  randomSpawnInPlace,
} from '../utils/board-helpers'

export const boardReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'reset': {
      return createInitialState()
    }
    case 'move': {
      const snapshot = structuredClone(state.board)
      const { newBoard, didMove } = move(state.board, action.direction)
      const latestStatus = getGameStatus(newBoard)
      didMove && randomSpawnInPlace(newBoard, 'single')
      return {
        ...state,
        ...(didMove && { board: newBoard }),
        ...(latestStatus != state.status && { status: latestStatus }),
        prevBoard: snapshot,
      }
    }
    case 'check': {
      return {
        ...state,
        status: getGameStatus(state.board),
      }
    }
    case 'undo': {
      return {
        ...state,
        board: state.prevBoard!!,
      }
    }
    default:
      return state
  }
}

export type GameState = {
  board: number[][]
  prevBoard?: number[][]
  status: GameStatus
}

export type GameStatus = 'playing' | 'win' | 'gameOver'

export type Direction = 'up' | 'down' | 'left' | 'right'

type Action =
  | { type: 'reset' }
  | { type: 'move'; direction: Direction }
  | { type: 'check' }
  | { type: 'undo' }
