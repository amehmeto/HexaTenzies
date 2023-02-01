import { Die, DieProps } from '../entities/Die'

export interface DieViewModel {
  id: string
  props: DieProps
}
export class DieMapper {
  static fromViewModel(dieViewModel: DieViewModel): Die {
    const { id, props } = dieViewModel
    return new Die(id, props)
  }

  static toViewModel(die: Die): DieViewModel {
    return {
      id: die.id,
      props: {
        value: die.props.value,
        isHeld: die.props.isHeld,
      },
    }
  }
}
