interface UndoButtonProps {
  handleClick: () => void
}

export const UndoButton = ({ handleClick }: UndoButtonProps) => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-3">
      <button
        className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700 active:scale-95"
        onClick={handleClick}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h10a8 8 0 018 8v1M3 10l6 6M3 10l6-6"
          ></path>
        </svg>
        Undo
      </button>
    </div>
  )
}
