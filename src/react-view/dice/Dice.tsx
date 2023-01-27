import { Die } from './components/Die'
import './Dice.css'
import { Die as DieModel, DieDTO } from '../../core/dice/entities/Die'
import { RootState } from '../main'
import { useSelector } from 'react-redux'

export function Dice() {
  const dice: DieDTO[] = useSelector<RootState, DieDTO[]>(
    (state) => state.dice.dice,
  )

  const diceElements = dice.map((die) => <Die key={die.id} die={die} />)

  return <div className="dice-container">{diceElements}</div>
}
