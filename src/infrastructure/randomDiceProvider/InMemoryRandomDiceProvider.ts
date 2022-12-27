import { RandomDiceProvider } from '../../core/ports/dice/randomDiceProvider'

export class InMemoryRandomDiceProvider implements RandomDiceProvider {
  generateRandomDie(): number {
    return 0
  }
}
