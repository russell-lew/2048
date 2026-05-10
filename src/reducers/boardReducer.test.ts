import { expect, it, vi } from 'vitest'
import { boardReducer } from './boardReducer'

const mockState = {
  board: [
    [0, 8, 2, 2],
    [4, 2, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ],
}

it('should generate an initial board with a random number of `2`s at random cells', () => {
  const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.1)
  const resetState = boardReducer(mockState, 'reset')
  expect(resetState.board).toHaveLength(4)
  expect(resetState.board[0]).toHaveLength(4)
  expect(resetState.board[0][1]).toBe(2)
  const activeTiles = resetState.board.flat().filter((t) => t != 0)
  expect(activeTiles).toHaveLength(1)
  randomSpy.mockRestore()
})

it('should shift tiles correctly for move left', () => {
  const shiftedState = boardReducer(mockState, 'move_left')
  const expectedBoard = [
    [8, 4, 0, 0],
    [4, 4, 0, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 0],
  ]
  expect(shiftedState.board).toEqual(expectedBoard)
})
