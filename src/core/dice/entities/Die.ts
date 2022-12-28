interface DieProps {
  value: number
  isHeld: boolean
}

export class Die {
  constructor(readonly id: string, readonly props: DieProps) {}
}
