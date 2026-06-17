import { useCallback, useEffect, useReducer } from 'react'
import { boardReducer, type Direction } from '../reducers/boardReducer'
import { createInitialState } from '../utils/board-helpers'
import { encodeBoard } from '../wasm/boardEncoder'
import { findBestMove } from '../wasm/suggestionWorker'
import MobileSwiper from './MobileSwiper'
import { Overlay } from './Overlay'
import { SuggestionButton } from './SuggestionButton'
import { Tile } from './Tile'
import { UndoButton } from './UndoButton'

export const Board = () => {
  const [state, dispatch] = useReducer(boardReducer, createInitialState())

  const handleMove = useCallback(
    (direction: Direction) => {
      if (state.status !== 'playing') return
      dispatch({ type: 'move', direction })
    },
    [state.status, dispatch],
  )

  const handleUndo = useCallback(() => {
    if (!state.prevBoard) return
    dispatch({ type: 'undo' })
  }, [state.status, dispatch])

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
      if (state.status !== 'playing') return
      const threshold = 30
      if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) return
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        handleMove(deltaX > 0 ? 'right' : 'left')
      } else {
        handleMove(deltaY > 0 ? 'down' : 'up')
      }
    },
    [state.status, handleMove],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      switch (e.key) {
        case 'ArrowUp':
          handleMove('up')
          break
        case 'ArrowDown':
          handleMove('down')
          break
        case 'ArrowLeft':
          handleMove('left')
          break
        case 'ArrowRight':
          handleMove('right')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleMove])

  return (
    <MobileSwiper onSwipe={handleSwipe}>
      <div className="flex aspect-square w-80 md:w-125 items-center justify-center rounded-lg border-2 border-gray-300 bg-background-20 shadow-xl p-2">
        <div className="grid grid-cols-4 gap-2 w-full h-full">
          {state.board.map((row, r) =>
            row.map((num, c) => (
              <Tile key={`${r}-${c}`} id={`${r}-${c}`} value={num} />
            )),
          )}
        </div>
      </div>
      {state.status == 'gameOver' && (
        <Overlay
          message={'Game Over!'}
          cta={'Try again'}
          handleClick={() => dispatch({ type: 'reset' })}
        />
      )}
      {state.status == 'win' && (
        <Overlay
          message={'You won!'}
          cta={'Play again'}
          handleClick={() => dispatch({ type: 'reset' })}
        />
      )}
      <UndoButton handleClick={handleUndo} />
      <SuggestionButton
        getSuggestion={() => findBestMove(encodeBoard(state.board))}
      />
    </MobileSwiper>
  )
}
