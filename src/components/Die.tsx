import './Die.css'

interface DieProps {
  value: number
}

export function Die({ value }: DieProps) {
  return (
    <div className="die-face">
      <h2 className="die-num">{value}</h2>
    </div>
  )
}
