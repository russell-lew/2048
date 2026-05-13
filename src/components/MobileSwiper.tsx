import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

interface SwipeData {
  deltaX: number
  deltaY: number
}

interface MobileSwiperProps {
  children: ReactNode
  onSwipe: (data: SwipeData) => void
}

export default function MobileSwiper({ children, onSwipe }: MobileSwiperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [startX, setStartX] = useState<number>(0)
  const [startY, setStartY] = useState<number>(0)

  const handleTouchStart = useCallback((e: globalThis.TouchEvent) => {
    if (!wrapperRef.current || !wrapperRef.current.contains(e.target as Node)) {
      return
    }

    setStartX(e.touches[0].clientX)
    setStartY(e.touches[0].clientY)
  }, [])

  const handleTouchEnd = useCallback(
    (e: globalThis.TouchEvent) => {
      if (
        !wrapperRef.current ||
        !wrapperRef.current.contains(e.target as Node)
      ) {
        return
      }

      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const deltaX = endX - startX
      const deltaY = endY - startY

      onSwipe({ deltaX, deltaY })
    },
    [startX, startY, onSwipe],
  )

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchEnd])

  return (
    <div ref={wrapperRef} style={{ touchAction: 'none' }}>
      {children}
    </div>
  )
}
