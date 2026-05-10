import { afterEach, expect, it, vi } from 'vitest'
import * as helpers from '../utils/board-helpers'
import { boardReducer } from './boardReducer'

const mockState = {
  board: [
    [0, 8, 2, 2],
    [4, 2, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ],
}

afterEach(() => {
  vi.restoreAllMocks()
})

const disableSpawning = () =>
  vi.spyOn(helpers, 'randomSpawnInPlace').mockImplementation(() => {})

it('should generate an initial board with a random number of `2`s at random cells', () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.1)
  const resetState = boardReducer(mockState, { type: 'reset' })
  expect(resetState.board).toHaveLength(4)
  expect(resetState.board[0]).toHaveLength(4)
  expect(resetState.board[0][1]).toBe(2)
  const activeTiles = resetState.board.flat().filter((t) => t != 0)
  expect(activeTiles).toHaveLength(1)
})

it('should shift tiles correctly for move left', () => {
  disableSpawning()
  const shiftedState = boardReducer(mockState, {
    type: 'move',
    direction: 'left',
  })
  const expectedBoard = [
    [8, 4, 0, 0],
    [4, 4, 0, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 0],
  ]
  expect(shiftedState.board).toEqual(expectedBoard)
})

it('should shift tiles correctly for move right', () => {
  disableSpawning()
  const shiftedState = boardReducer(mockState, {
    type: 'move',
    direction: 'right',
  })
  const expectedBoard = [
    [0, 0, 8, 4],
    [0, 0, 4, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ]
  expect(shiftedState.board).toEqual(expectedBoard)
})

it('should shift tiles correctly for move up', () => {
  disableSpawning()
  const shiftedState = boardReducer(mockState, {
    type: 'move',
    direction: 'up',
  })
  const expectedBoard = [
    [4, 8, 2, 4],
    [0, 2, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  expect(shiftedState.board).toEqual(expectedBoard)
})

it('should shift tiles correctly for move down', () => {
  disableSpawning()
  const shiftedState = boardReducer(mockState, {
    type: 'move',
    direction: 'down',
  })
  const expectedBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 8, 0, 2],
    [4, 2, 2, 4],
  ]
  expect(shiftedState.board).toEqual(expectedBoard)
})

it('should generate a `2` or `4` at a random empty space after each valid move that changes the board', () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.99)
  const shiftedState = boardReducer(mockState, {
    type: 'move',
    direction: 'left',
  })
  const expectedBoard = [
    [8, 4, 0, 0],
    [4, 4, 0, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 4],
  ]
  expect(shiftedState.board).toEqual(expectedBoard)
})
