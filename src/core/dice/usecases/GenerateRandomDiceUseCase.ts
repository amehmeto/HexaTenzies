import { RandomDiceProvider } from '../ports/randomDiceProvider'
import { IdProvider } from '../ports/IdProvider'
import { Die } from '../entities/Die'

export class GenerateRandomDiceUseCase {
  constructor(
    private randomDiceProvider: RandomDiceProvider,
    private idProvider: IdProvider,
  ) {}
  execute(): Die[] {
    const AMOUNT_OF_DIES = 10
    return Array(AMOUNT_OF_DIES)
      .fill(undefined)
      .map(() => this.generateRandomDice())
  }

  private generateRandomDice() {
    const props = {
      value: this.randomDiceProvider.generateRandomDieValue(),
      isHeld: false,
    }
    return new Die(this.idProvider.getNew(), props)
  }
}
