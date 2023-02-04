import './App.css'
import './DesignSystem.css'
import { Dice } from './dice/Dice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './main'
import { rollDice } from '../core/dice/usecases/rollDice/rollDice'
import { useEffect } from 'react'
import { initializeDice } from '../core/dice/usecases/initializeDice/initializeDice'
import Confetti from 'react-confetti'
import { Instructions } from './Instructions'
import { checkTenzies } from '../core/dice/usecases/checkTenzies/checkTenzies'
import { DiceViewModel } from '../core/dice/diceSlice'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const dice = useSelector<RootState, DiceViewModel>((state) => state.dice.dice)

  useEffect(() => {
    ;(async () => resetGame())()
  }, [])

  useEffect(() => {
    dispatch(checkTenzies())
  }, [dice])

  async function resetGame() {
    await dispatch(initializeDice())
    await dispatch(rollDice())
  }

  function handleClick(dice: DiceViewModel) {
    return dice.isTenzies
      ? async () => {
          await dispatch(initializeDice())
          await dispatch(rollDice())
        }
      : () => dispatch(rollDice())
  }

  return (
    <main>
      {dice.isTenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <Instructions />
      <Dice />
      <br />
      <button className="roll-btn" onClick={handleClick(dice)}>
        {dice.isTenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}

export default App
