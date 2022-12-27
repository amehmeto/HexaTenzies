import './App.css'
import { Die } from './components/Die'

function App() {
  const dice = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4]
  const diceElements = dice.map((die) => <Die value={die} />)

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
    </main>
  )
}

export default App
