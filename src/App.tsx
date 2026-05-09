import { Board } from './components/Board'

function App() {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      <header className="flex-none bg-background-10 p-4">
        <h1 className="text-xl text-center font-bold text-primary-text-color">
          2048
        </h1>
      </header>

      <main className="flex flex-1 items-center justify-center overflow-hidden p-4 bg-background-10">
        <Board />
      </main>
    </div>
  )
}

export default App
