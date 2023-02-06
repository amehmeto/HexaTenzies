import { Dice } from '../entities/Dice'
import { IdProvider } from '../ports/IdProvider'
import { DieMapper, DieViewModel } from './DieMapper'

export type DiceViewModel = {
  isTenzies: boolean
  attempts: number
  dies: DieViewModel[]
}

export class DiceMapper {
  static toViewModel(dice: Dice): DiceViewModel {
    const dies = dice.dies.map((die) => DieMapper.toViewModel(die))
    return {
      isTenzies: dice.isTenzies,
      attempts: dice.attempts,
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
    return new Dice(idProvider, diceViewModel.isTenzies, diceViewModel.attempts,dies)
  }
}
