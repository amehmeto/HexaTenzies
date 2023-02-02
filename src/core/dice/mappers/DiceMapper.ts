import { Die } from '../entities/Die'
import { DieMapper, DieViewModel } from './DieMapper'
import { Dice } from '../entities/Dice'

export class DiceMapper {
  static toViewModel(dice: Dice): DieViewModel[] {
    return dice.dice.map((die) => DieMapper.toViewModel(die))
  }

  static fromViewModel(diceViewModel: DieViewModel[]) {
    return diceViewModel.map((dieViewModel) =>
      DieMapper.fromViewModel(dieViewModel),
    )
  }
}
