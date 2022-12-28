import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Die } from './components/Die'
import './Dice.css'

export function Dice() {
  const dice: number[] = useSelector<RootState, number[]>((state) => state.dice)

  const diceElements = dice.map((die, index) => <Die key={index} value={die} />)
  return <div className="dice-container">{diceElements}</div>
}
