import './Die.css'

interface DieProps {
  value: number
  isHeld: boolean
}

export function Die({ value, isHeld }: DieProps) {
  const isHeldStyle = {
    backgroundColor: isHeld ? `var(--held-die)` : `var(--bright-white)`,
  }
  return (
    <div className="die-face" style={isHeldStyle}>
      <h2 className="die-num">{value}</h2>
    </div>
  )
}
