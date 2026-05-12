import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Tile } from './Tile'

describe('Tile', () => {
  it('should render with the correct id attribute', () => {
    const testId = 'tile-0-0'
    render(<Tile id={testId} value={0} />)

    const tileElement = document.getElementById(testId)
    expect(tileElement).toBeInTheDocument()
  })

  it('should apply the correct dynamic class based on value', () => {
    const { container } = render(<Tile id="test" value={2048} />)

    const tileDiv = container.firstChild as HTMLElement
    expect(tileDiv).toHaveClass('tile-2048')
  })

  it('should display the value when it is greater than 0', () => {
    render(<Tile id="test" value={2} />)

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should not display any text when the value is 0', () => {
    render(<Tile id="test" value={0} />)

    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should include necessary layout classes for the grid', () => {
    const { container } = render(<Tile id="test" value={2} />)

    const tileDiv = container.firstChild as HTMLElement
    expect(tileDiv).toHaveClass(
      'relative',
      'flex',
      'items-center',
      'justify-center',
      'aspect-square',
    )
  })
})
