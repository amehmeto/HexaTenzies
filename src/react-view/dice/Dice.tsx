import { Die } from './components/Die'
import './Dice.css'
import { RootState } from '../main'
import { useSelector } from 'react-redux'
import { DieViewModel } from '../../core/dice/mappers/DieMapper'

export function Dice() {
  const dice: DieViewModel[] = useSelector<RootState, DieViewModel[]>(
    (state) => state.dice.dice.dies,
  )

  const diceElements = dice.map((die) => <Die key={die.id} die={die} />)

  return <div className="dice-container">{diceElements}</div>
}
