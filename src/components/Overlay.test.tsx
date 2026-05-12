import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Overlay } from './Overlay'

describe('Overlay', () => {
  const defaultProps = {
    message: 'Game Over!',
    cta: 'Try Again',
    handleClick: vi.fn(),
  }

  it('should render the correct message', () => {
    render(<Overlay {...defaultProps} />)

    expect(screen.getByText(defaultProps.message)).toBeInTheDocument()
  })

  it('should render the button with the correct CTA text', () => {
    render(<Overlay {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent(defaultProps.cta)
  })

  it('should call handleClick when the button is clicked', () => {
    render(<Overlay {...defaultProps} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(defaultProps.handleClick).toHaveBeenCalledTimes(1)
  })

  it('should have the expected container classes for positioning and animation', () => {
    const { container } = render(<Overlay {...defaultProps} />)
    const overlayDiv = container.firstChild as HTMLElement

    expect(overlayDiv).toHaveClass(
      'absolute',
      'inset-0',
      'flex',
      'items-center',
      'justify-center',
      'bg-black/60',
    )
  })

  it('should include the backdrop blur for visual depth', () => {
    const { container } = render(<Overlay {...defaultProps} />)
    const overlayDiv = container.firstChild as HTMLElement

    expect(overlayDiv).toHaveClass('backdrop-blur-sm')
  })
})
