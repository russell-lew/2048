interface OverlayProps {
  message: string
  cta: string
  handleClick: () => void
}

export const Overlay = ({ message, cta, handleClick }: OverlayProps) => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm animate-in fade-in duration-500">
      <h2 className="text-4xl font-bold text-white mb-4">{message}</h2>
      <button
        onClick={() => handleClick()}
        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-lg transition-colors shadow-lg"
      >
        {cta}
      </button>
    </div>
  )
}
