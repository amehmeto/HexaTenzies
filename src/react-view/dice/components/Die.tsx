import './Die.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../main'
import { holdDie } from '../../../core/dice/diceSlice'

interface DieProps {
  die: {
    id: string
    props: {
      value: number
      isHeld: boolean
    }
  }
}

export function Die({
  die: {
    id,
    props: { isHeld, value },
  },
}: DieProps) {
  const dispatch = useDispatch<AppDispatch>()

  console.log(id, isHeld, value)
  const isHeldStyle = {
    backgroundColor: isHeld ? `var(--held-die)` : `var(--bright-white)`,
  }

  return (
    <div
      className="die-face"
      style={isHeldStyle}
      onClick={() => dispatch(holdDie(id))}
    >
      <h2 className="die-num">{value}</h2>
    </div>
  )
}
