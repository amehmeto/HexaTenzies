import { RandomNumberProvider } from '../../ports/randomNumberProvider'
import { IdProvider } from '../../ports/IdProvider'
import { Die } from '../../entities/Die'

export class RollDiceUseCase {
  private readonly AMOUNT_OF_DICE = 10

  constructor(
    private randomNumberProvider: RandomNumberProvider,
    private idProvider: IdProvider,
  ) {}

  execute(): Die[] {
    const dice = Array(this.AMOUNT_OF_DICE)
      .fill(undefined)
      .map(() => {
        const newId = this.idProvider.getNew()
        const randomNumber = this.randomNumberProvider.generate()
        return new Die(newId, randomNumber)
      })
    dice.forEach((die) => die.roll())
    return dice
  }
}
