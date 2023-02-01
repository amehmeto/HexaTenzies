import { RandomnessProvider } from '../../core/dice/ports/randomnessProvider'

export class RealRandomNumberProvider implements RandomnessProvider {
  generate(): number {
    return Math.random()
  }
}
