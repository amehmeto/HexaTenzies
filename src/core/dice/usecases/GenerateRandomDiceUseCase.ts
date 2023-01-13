import { RandomDiceProvider } from '../ports/randomDiceProvider'
import { IdProvider } from '../ports/IdProvider'
import { Die } from '../entities/Die'

export class GenerateRandomDiceUseCase {
  constructor(
    private randomDiceProvider: RandomDiceProvider,
    private idProvider: IdProvider,
  ) {}
  execute(): Die[] {
    const AMOUNT_OF_DICE = 10
    return Array(AMOUNT_OF_DICE)
      .fill(undefined)
      .map(() => this.generateRandomDie())
  }

  private generateRandomDie() {
    const props = {
      value: this.randomDiceProvider.generateRandomDieValue(),
      isHeld: false,
    }
    return new Die(this.idProvider.getNew(), props)
  }
}
