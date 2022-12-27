import { RandomDiceProvider } from '../../core/ports/dice/randomDiceProvider'

export class RealRandomDiceProvider implements RandomDiceProvider {
  generateRandomDie(): number {
    return ~~(Math.random() * 6) + 1
  }
}
