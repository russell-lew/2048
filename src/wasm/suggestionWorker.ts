// @ts-ignore - Emscripten generated file, no types needed here
import create2048Module from './2048.js'
import wasmUrl from './2048.wasm?url'

interface WasmModule {
  _find_best_move: (board: bigint) => number
  _init_tables: () => void
  _malloc: (size: number) => number
  _free: (ptr: number) => void
  HEAP32: Int32Array
}

let moduleInstance: WasmModule | null = null

const getModule = async (): Promise<WasmModule> => {
  if (!moduleInstance) {
    moduleInstance = await create2048Module({
      locateFile: () => wasmUrl,
      print: () => {},
      printErr: () => {},
    })
  }
  moduleInstance!._init_tables()
  return moduleInstance!
}

export const findBestMove = async (board: bigint): Promise<string | null> => {
  const mod = await getModule()
  const move = mod._find_best_move(board)
  switch (move) {
    case 0:
      return 'up'
    case 1:
      return 'down'
    case 2:
      return 'left'
    case 3:
      return 'right'
    default:
      return null
  }
}
