import './App.css'
import './DesignSystem.css'
import { Dice } from './dice/Dice'
import { useDispatch } from 'react-redux'
import { rollDice } from '../core/dice/diceSlice'
import { AppDispatch } from './main'

function App() {
  const dispatch = useDispatch<AppDispatch>()

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
