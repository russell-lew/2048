import { expect, it, vi } from 'vitest'
import { boardReducer } from './boardReducer'

const mockState = {
  board: [
    [0, 0, 0, 2],
    [0, 4, 8, 16],
    [32, 32, 64, 16],
    [128, 128, 256, 256],
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
