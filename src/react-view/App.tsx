import './App.css'
import './DesignSystem.css'
import { Dice } from './dice/Dice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './main'
import { rollDice } from '../core/dice/usecases/rollDice/rollDice'
import { useEffect } from 'react'
import { initializeDice } from '../core/dice/usecases/initializeDice/initializeDice'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(initializeDice())
    dispatch(rollDice())
  }, [])

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
