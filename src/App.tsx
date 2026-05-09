import { Board } from './components/Board'

function App() {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      <header className="flex-none bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-gray-800">2048</h1>
      </header>

      <main className="flex flex-1 items-center justify-center overflow-hidden p-4">
        <Board />
      </main>
    </div>
  )
}

export default App
