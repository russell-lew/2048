import { describe, expect, it } from 'vitest'
import { encodeBoard } from './boardEncoder'

describe('encodeBoard()', () => {
  it('should encode an empty board as 0n', () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    expect(encodeBoard(board)).toBe(0n)
  })

  it('should encode the first tile (0,0) correctly', () => {
    const board = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    expect(encodeBoard(board)).toBe(1n)
  })

  it('should encode a value at the end of the board (3,3)', () => {
    const board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 16],
    ]
    const expected = 4n << 60n
    expect(encodeBoard(board)).toBe(expected)
  })

  it('should correctly handle multiple tiles across the board', () => {
    const board = [
      [2, 4, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 8, 0],
      [0, 0, 0, 0],
    ]
    const expected = (1n << 0n) | (2n << 4n) | (3n << 40n)
    expect(encodeBoard(board)).toBe(expected)
  })

  it('should handle the maximum tile value (2^15)', () => {
    const board = [
      [32768, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    expect(encodeBoard(board)).toBe(15n)
  })
})
