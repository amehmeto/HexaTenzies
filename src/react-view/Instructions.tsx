import { useSelector } from 'react-redux'
import { RootState } from './main'
import { DiceViewModel } from '../core/dice/mappers/DiceMapper'

export function Instructions() {
  const dice = useSelector<RootState, DiceViewModel>((state) => state.dice.dice)

  return (
    <p className="instructions">
      Roll until all dice are the same. Click each die to freeze it at its
      current value between rolls.
      <br />
      <br />
      <span className="attempts">Attempts:</span> {dice.attempts}
    </p>
  )
}
