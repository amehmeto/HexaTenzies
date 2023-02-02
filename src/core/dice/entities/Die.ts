import { RandomnessProvider } from '../ports/randomnessProvider'

export interface DieProps {
  value: number
  isHeld: boolean
}

const DEFAULT_DIE_PROPS = {
  value: 6,
  isHeld: false,
}

export class Die {
  private readonly MIN_VALUE = 1
  private readonly MAX_VALUE = 6

  constructor(
    public readonly id: string,
    public props: DieProps = DEFAULT_DIE_PROPS,
  ) {
    this.props = props
  }

  public roll(randomnessProvider: RandomnessProvider): void {
    const newRandomValue =
      ~~(randomnessProvider.generate() * this.MAX_VALUE) + this.MIN_VALUE

    this.props = {
      value: newRandomValue,
      isHeld: this.props.isHeld,
    }
    // The next line works 1 time but not 2 times, WTF
    // this.props.value = newValue
  }

  public hold(): void {
    this.props.isHeld = !this.props.isHeld
  }
}
