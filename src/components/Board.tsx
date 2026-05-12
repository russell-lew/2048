import { useEffect, useReducer } from 'react'
import { boardReducer } from '../reducers/boardReducer'
import { createInitialState } from '../utils/board-helpers'
import { encodeBoard } from '../wasm/boardEncoder'
import { findBestMove } from '../wasm/suggestionWorker'
import { Overlay } from './Overlay'
import { SuggestionButton } from './SuggestionButton'
import { Tile } from './Tile'

export const Board = () => {
  const [state, dispatch] = useReducer(boardReducer, createInitialState())
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.status != 'playing') return
      e.preventDefault()
      switch (e.key) {
        case 'ArrowUp': {
          dispatch({ type: 'move', direction: 'up' })
          return
        }
        case 'ArrowDown': {
          dispatch({ type: 'move', direction: 'down' })
          return
        }
        case 'ArrowLeft': {
          dispatch({ type: 'move', direction: 'left' })
          return
        }
        case 'ArrowRight': {
          dispatch({ type: 'move', direction: 'right' })
          return
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])
  return (
    <div className="flex aspect-square w-100 md:w-125 items-center justify-center rounded-lg border-2 border-gray-300 bg-background-20 shadow-xl p-2">
      <div className="grid grid-cols-4 gap-2 w-full h-full">
        {state.board.map((row, r) =>
          row.map((num, c) => (
            <Tile key={`${r}-${c}`} id={`${r}-${c}`} value={num} />
          )),
        )}
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
      <SuggestionButton
        getSuggestion={() => findBestMove(encodeBoard(state.board))}
      />
    </div>
  )
}
