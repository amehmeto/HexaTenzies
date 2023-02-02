import { RandomnessProvider } from '../ports/randomnessProvider'

export interface DieProps {
  value: number
  isHeld: boolean
}

export class Die {
  private readonly MIN_VALUE = 1
  private readonly MAX_VALUE = 6

  constructor(
    public readonly id: string,
    public readonly props: DieProps = {
      value: 6,
      isHeld: false,
    },
  ) {
    this.props = props
  }

  public roll(randomnessProvider: RandomnessProvider): void {
    this.props.value =
      ~~(randomnessProvider.generate() * this.MAX_VALUE) + this.MIN_VALUE
  }

  public hold(): void {
    this.props.isHeld = !this.props.isHeld
  }
}
