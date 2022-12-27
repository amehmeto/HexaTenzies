import { RandomDiceProvider } from '../../ports/dice/randomDiceProvider'

export class GenerateRandomDiceUseCase {
  constructor(private randomDiceProvider: RandomDiceProvider) {}
  execute(): number[] {
    return Array(10)
      .fill(undefined)
      .map(() => this.randomDiceProvider.generateRandomDie())
  }
}
