import { memo } from 'react'

export const Tile = memo(({ id, value }: TileProps) => (
  <div
    id={id}
    className={`@container group relative flex items-center justify-center tile-${value} rounded aspect-square overflow-hidden`}
  >
    <span className="font-semibold text-2xl md:text-3xl">{value}</span>
  </div>
))

interface TileProps {
  id: string
  value: number
}
