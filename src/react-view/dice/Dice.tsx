import { useSelector } from 'react-redux'
import { Die } from './components/Die'
import './Dice.css'
import { Die as DieModel } from '../../core/dice/entities/Die'
import { RootState } from '../main'

export function Dice() {
  const dice: DieModel[] = useSelector<RootState, DieModel[]>(
    (state) => state.dice.dice,
  )

  const diceElements = dice.map((die) => (
    <Die key={die.id} value={die.props.value} isHeld={die.props.isHeld} />
  ))

  return <div className="dice-container">{diceElements}</div>
}
