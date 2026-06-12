import { memo } from 'react'

export const Tile = memo(({ id, value }: TileProps) => {
  const cssValue = value == -1 ? 'block' : value.toString()
  return (
    <div
      id={id}
      className={`@container group relative flex items-center justify-center tile-${cssValue} rounded aspect-square overflow-hidden`}
    >
      {value > 0 && (
        <span className="font-bold text-3xl md:text-5xl">{value}</span>
      )}
    </div>
  )
})

interface TileProps {
  id: string
  value: number
}
