import { RandomNumberProvider } from '../ports/randomNumberProvider'
import { IdProvider } from '../ports/IdProvider'
import { Die } from '../entities/Die'

export class RollDiceUseCase {
  private readonly AMOUNT_OF_DICE = 10

  constructor(
    private randomNumberProvider: RandomNumberProvider,
    private idProvider: IdProvider,
  ) {}

  execute(): Die[] {
    const dice = Array(this.AMOUNT_OF_DICE)
      .fill(undefined)
      .map(
        () =>
          new Die(
            this.idProvider.getNew(),
            this.randomNumberProvider.generate(),
          ),
      )
    dice.forEach((die) => die.roll())
    return dice
  }
}
