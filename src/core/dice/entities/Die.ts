export interface DieDTO {
  id: string
  props: DieProps
}
interface DieProps {
  value: number
  isHeld: boolean
}

export class Die {
  private readonly MIN_VALUE = 1
  private readonly MAX_VALUE = 6

  constructor(
    public readonly id: string,
    readonly props: DieProps = {
      value: 6,
      isHeld: false,
    },
  ) {
    this.props = props
  }

  public roll(randomNumber: number): void {
    this.props.value = ~~(randomNumber * this.MAX_VALUE) + this.MIN_VALUE
  }

  public hold(): void {
    this.props.isHeld = !this.props.isHeld
  }

  static fromDTO(dieDTO: DieDTO): Die {
    const { id, props } = dieDTO
    return new Die(id, props)
  }

  toDTO(): DieDTO {
    return {
      id: this.id,
      props: {
        value: this.props.value,
        isHeld: this.props.isHeld,
      },
    }
  }
}
