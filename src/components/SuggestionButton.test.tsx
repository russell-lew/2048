import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CTA_LABEL_DEFAULT, CTA_LABEL_LOADING } from '../constants/constants'
import { SuggestionButton } from './SuggestionButton'

describe('SuggestionButton', () => {
  const mockGetSuggestion = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render in the initial state with correct default text', () => {
    render(<SuggestionButton getSuggestion={mockGetSuggestion} />)

    expect(screen.getByText(CTA_LABEL_DEFAULT)).toBeInTheDocument()
    expect(screen.queryByText(/Suggested:/i)).not.toBeInTheDocument()
  })

  it('shows the loading state and triggers the suggestion fetch on click', async () => {
    let resolvePromise: (value: string) => void
    const promise = new Promise<string>((resolve) => {
      resolvePromise = resolve
    })
    mockGetSuggestion.mockReturnValue(promise)

    render(<SuggestionButton getSuggestion={mockGetSuggestion} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByText(CTA_LABEL_LOADING)).toBeInTheDocument()
    expect(mockGetSuggestion).toHaveBeenCalledTimes(1)

    resolvePromise!('up')
  })

  it('should display the suggestion tooltip after a successful fetch', async () => {
    const mockValue = 'right'
    mockGetSuggestion.mockResolvedValue(mockValue)

    render(<SuggestionButton getSuggestion={mockGetSuggestion} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/Suggested:/i)).toBeInTheDocument()
      expect(screen.getByText(mockValue)).toBeInTheDocument()
    })

    expect(screen.getByText(CTA_LABEL_DEFAULT)).toBeInTheDocument()
  })

  it('should prevent multiple concurrent calls while loading', async () => {
    mockGetSuggestion.mockReturnValue(new Promise(() => {}))

    render(<SuggestionButton getSuggestion={mockGetSuggestion} />)

    const button = screen.getByRole('button')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockGetSuggestion).toHaveBeenCalledTimes(1)
  })
})
