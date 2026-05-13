import { memo } from 'react'

export const Tile = memo(({ id, value }: TileProps) => (
  <div
    id={id}
    className={`@container group relative flex items-center justify-center tile-${value} rounded aspect-square overflow-hidden`}
  >
    {value > 0 && (
      <span className="font-bold text-3xl md:text-5xl">{value}</span>
    )}
  </div>
))

interface TileProps {
  id: string
  value: number
}
