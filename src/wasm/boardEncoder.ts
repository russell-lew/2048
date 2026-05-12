export const encodeBoard = (board: number[][]): bigint => {
  let result = 0n
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const val = board[r][c]
      const exponent = val === 0 ? 0 : Math.log2(val)
      result |= BigInt(exponent) << BigInt((r * 4 + c) * 4)
    }
  }
  return result
}
