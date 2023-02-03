import { DieMapper } from './DieMapper'
import { Dice } from '../entities/Dice'
import { DiceViewModel } from '../diceSlice'
import { IdProvider } from '../ports/IdProvider'

export class DiceMapper {
  static toViewModel(dice: Dice): DiceViewModel {
    const dies = dice.dies.map((die) => DieMapper.toViewModel(die))
    return {
      isTenzies: dice.isTenzies,
      dies,
    }
  }

  static fromViewModel(
    idProvider: IdProvider,
    diceViewModel: DiceViewModel,
  ): Dice {
    const dies = diceViewModel.dies.map((dieViewModel) =>
      DieMapper.fromViewModel(dieViewModel),
    )
    return new Dice(idProvider, diceViewModel.isTenzies, dies)
  }
}
