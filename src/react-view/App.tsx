import './App.css'
import { Dice } from './dice/Dice'
import { useDispatch } from 'react-redux'
import { rollDice } from '../core/slices/dice/diceSlice'

function App() {
  const dispatch = useDispatch()

  return (
    <main>
      <Dice />
      <button className="roll-btn" onClick={() => dispatch(rollDice())}>
        Roll
      </button>
    </main>
  )
}

export default App
