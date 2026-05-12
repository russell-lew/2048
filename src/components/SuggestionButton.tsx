import { useEffect, useState } from 'react'
import { CTA_LABEL_DEFAULT, CTA_LABEL_LOADING } from '../constants/constants'

export const SuggestionButton = ({
  getSuggestion,
}: {
  getSuggestion: () => Promise<string | null>
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)

  const handleClick = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const result = await getSuggestion()
      if (typeof result === 'string') {
        setSuggestion(result)
      }
    } catch (error) {
      console.error('AI Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (suggestion) {
      const timer = setTimeout(() => {
        setSuggestion(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [suggestion])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {suggestion && !isLoading && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 bg-white text-slate-900 px-4 py-2 rounded-2xl shadow-xl border border-slate-100 text-m font-bold relative mb-1">
          <span className="text-blue-600 mr-1">Suggested:</span> {suggestion}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100" />
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center leading-5 shadow-lg transition-transform active:scale-95 flex items-center"
      >
        <div
          className={`w-5 h-5 mr-2 bg-white ${isLoading ? 'animate-pulse' : ''}`}
          style={{
            maskImage: 'url(/assets/ai-icon.svg)',
            WebkitMaskImage: 'url(/assets/ai-icon.svg)',
            maskRepeat: 'no-repeat',
            maskSize: 'contain',
            maskPosition: 'center',
          }}
        />
        {isLoading ? CTA_LABEL_LOADING : CTA_LABEL_DEFAULT}
      </button>
    </div>
  )
}
