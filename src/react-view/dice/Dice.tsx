import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Die } from './components/Die'

import './Dice.css'
import { Die as DieModel } from '../../core/dice/entities/Die'

export function Dice() {
  const dice: DieModel[] = useSelector<RootState, DieModel[]>(
    (state) => state.dice,
  )

  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.props.value} isHeld={die.props.isHeld} />
  ))

  return <div className="dice-container">{diceElements}</div>
}
