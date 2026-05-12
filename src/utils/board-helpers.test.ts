import { describe, expect, it } from 'vitest'
import { BOARD_SIZE, WIN_CONDITION } from '../constants/constants'
import {
  createInitialState,
  getGameStatus,
  move,
  randomSpawnInPlace,
} from './board-helpers'

describe('board-helpers', () => {
  describe('move', () => {
    it('should slide tiles to the left and merge identical neighbors', () => {
      const board = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
      const { newBoard, didMove } = move(board, 'left')
      expect(newBoard[0]).toEqual([4, 0, 0, 0])
      expect(didMove).toBe(true)
    })

    it('should not merge a tile twice in a single move', () => {
      const board = [
        [2, 2, 4, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
      const { newBoard } = move(board, 'left')
      // Should be [4, 4, 0, 0], not [8, 0, 0, 0]
      expect(newBoard[0]).toEqual([4, 4, 0, 0])
    })

    it('should correctly move tiles up', () => {
      const board = [
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
      const { newBoard } = move(board, 'up')
      expect(newBoard[0][0]).toBe(4)
      expect(newBoard[1][0]).toBe(0)
    })

    it('should return didMove as false if no tiles can shift', () => {
      const board = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ]
      const { didMove } = move(board, 'left')
      expect(didMove).toBe(false)
    })
  })

  describe('getGameStatus', () => {
    it('should return "win" if a tile reaches the WIN_CONDITION', () => {
      const board = Array(BOARD_SIZE)
        .fill(0)
        .map(() => Array(BOARD_SIZE).fill(0))
      board[0][0] = WIN_CONDITION
      expect(getGameStatus(board)).toBe('win')
    })

    it('should return "playing" if the board is full but merges are available horizontally', () => {
      const board = [
        [2, 2, 4, 8],
        [4, 8, 2, 4],
        [2, 4, 8, 2],
        [4, 2, 4, 8],
      ]
      expect(getGameStatus(board)).toBe('playing')
    })

    it('should return "playing" if the board is full but merges are available vertically', () => {
      const board = [
        [2, 4, 8, 2],
        [2, 8, 2, 4],
        [4, 2, 4, 8],
        [8, 4, 2, 4],
      ]
      expect(getGameStatus(board)).toBe('playing')
    })

    it('should return "gameOver" if the board is full and no merges exist', () => {
      const board = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ]
      expect(getGameStatus(board)).toBe('gameOver')
    })

    it('should return "playing" when a merge is only available in the last row', () => {
      const board = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 8, 8, 2],
      ]

      expect(getGameStatus(board)).toBe('playing')
    })

    it('should return "playing" when a merge is only available in the last column', () => {
      const board = [
        [2, 4, 2, 4],
        [4, 2, 4, 8],
        [2, 4, 2, 8],
        [4, 2, 4, 2],
      ]
      expect(getGameStatus(board)).toBe('playing')
    })
  })

  describe('randomSpawnInPlace', () => {
    it('should add a tile to an empty cell', () => {
      const board = [
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [2, 2, 2, 2],
        [2, 2, 2, 0],
      ]
      randomSpawnInPlace(board, 'single')
      expect(board[3][3]).not.toBe(0)
    })

    it('should not crash if the board is completely full', () => {
      const board = Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(2))
      expect(() => randomSpawnInPlace(board, 'single')).not.toThrow()
    })
  })

  describe('createInitialState', () => {
    it('should initialize a game with multiple spawned tiles', () => {
      const state = createInitialState()
      const nonZeroTiles = state.board.flat().filter((val) => val !== 0)

      expect(state.status).toBe('playing')
      expect(nonZeroTiles.length).toBeGreaterThanOrEqual(1)
    })
  })
})
