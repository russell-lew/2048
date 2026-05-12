import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as boardHelpers from '../utils/board-helpers'
import { Board } from './Board'

vi.mock('../wasm/suggestionWorker', () => ({
  findBestMove: vi.fn(),
}))

vi.mock('../wasm/boardEncoder', () => ({
  encodeBoard: vi.fn(),
}))

vi.mock('../utils/board-helpers', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../utils/board-helpers')>()
  return {
    ...actual,
    createInitialState: vi.fn(),
  }
})

vi.mock('./Tile', () => ({
  Tile: ({ value, id }: { value: number; id: string }) => (
    <div data-testid="tile" data-value={value} id={id} />
  ),
}))

vi.mock('./SuggestionButton', () => ({
  SuggestionButton: () => <button>Get Suggestion</button>,
}))

describe('Board Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(boardHelpers.createInitialState).mockReturnValue({
      board: [
        [2, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      status: 'playing',
    })
  })

  it('should render exactly 16 tiles for a 4x4 grid', () => {
    render(<Board />)
    const tiles = screen.getAllByTestId('tile')
    expect(tiles).toHaveLength(16)
  })

  it('should render the suggestion button', () => {
    render(<Board />)
    expect(screen.getByText(/Get Suggestion/i)).toBeInTheDocument()
  })

  it('should show the game over overlay only when status is gameOver', () => {
    vi.mocked(boardHelpers.createInitialState).mockReturnValue({
      board: Array(4).fill(Array(4).fill(0)),
      status: 'gameOver',
    })

    render(<Board />)

    expect(screen.getByText(/Game Over!/i)).toBeInTheDocument()
    expect(screen.getByText(/Try again/i)).toBeInTheDocument()
  })

  it('should show the win overlay only when status is win', () => {
    vi.mocked(boardHelpers.createInitialState).mockReturnValue({
      board: Array(4).fill(Array(4).fill(0)),
      status: 'win',
    })

    render(<Board />)

    expect(screen.getByText(/You won!/i)).toBeInTheDocument()
    expect(screen.getByText(/Play again/i)).toBeInTheDocument()
  })

  it('should remove the keydown event listener when the component unmounts', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<Board />)

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })

  it('should prevent default browser behavior when a valid arrow key is pressed', () => {
    render(<Board />)
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

    fireEvent(window, event)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })
})
