import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Die } from './components/Die'

export function Dice() {
  const dice: number[] = useSelector<RootState, number[]>((state) => state.dice)

  const diceElements = dice.map((die) => <Die value={die} />)
  return <div className="dice-container">{diceElements}</div>
}
