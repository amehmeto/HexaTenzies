import { RandomDiceProvider } from '../../core/dice/ports/randomDiceProvider'

export class RealRandomDiceProvider implements RandomDiceProvider {
  generateRandomDieValue(): number {
    const DIE_MAX_VALUE = 6
    return ~~(Math.random() * DIE_MAX_VALUE) + 1
  }
}
