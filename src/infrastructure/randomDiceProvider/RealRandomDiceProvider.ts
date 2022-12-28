import { RandomDiceProvider } from '../../core/ports/dice/randomDiceProvider'

export class RealRandomDiceProvider implements RandomDiceProvider {
  generateRandomDie(): number {
    const DIE_MAX_VALUE = 6
    return ~~(Math.random() * DIE_MAX_VALUE) + 1
  }
}
