import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Die } from './components/Die'

import './Dice.css'
import { Die as Die2 } from '../../core/dice/entities/Die'

export function Dice() {
  const dice: Die2[] = useSelector<RootState, Die2[]>((state) => state.dice)

  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.props.value} />
  ))
  return <div className="dice-container">{diceElements}</div>
}
