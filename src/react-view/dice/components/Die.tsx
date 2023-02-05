import './Die.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../main'
import { holdDie } from '../../../core/dice/usecases/holdDie/holdDie'

interface DieProps {
  die: {
    id: string
    props: {
      value: number
      isHeld: boolean
      isCorrect: boolean
    }
  }
}

export function Die({
  die: {
    id,
    props: { isHeld, isCorrect, value },
  },
}: DieProps) {
  const dispatch = useDispatch<AppDispatch>()

  function determineBackgroundColor() {
    if (!isHeld) return `var(--bright-white)`

    return isCorrect ? `var(--correct-die)` : `var(--incorrect-die)`
  }

  const backgroundColor = determineBackgroundColor()

  const isHeldStyle = {
    backgroundColor,
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
