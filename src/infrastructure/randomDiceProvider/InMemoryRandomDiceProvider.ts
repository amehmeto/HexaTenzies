import { RandomDiceProvider } from '../../core/dice/ports/randomDiceProvider'

export class InMemoryRandomDiceProvider implements RandomDiceProvider {
  generateRandomDieValue(): number {
    return 0
  }
}
