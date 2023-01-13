interface DieProps {
  value: number
  isHeld: boolean
}

export class Die {
  public readonly props: DieProps
  private readonly MIN_VALUE = 1
  private readonly MAX_VALUE = 6

  constructor(readonly id: string, private readonly randomNumber: number) {
    this.props = {
      value: this.roll(),
      isHeld: false,
    }
  }

  public roll(): number {
    return ~~(this.randomNumber * this.MAX_VALUE) + this.MIN_VALUE
  }
}
