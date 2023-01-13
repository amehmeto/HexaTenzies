import { RandomNumberProvider } from '../../core/dice/ports/randomNumberProvider'

export class InMemoryRandomNumberProvider implements RandomNumberProvider {
  generate(): number {
    // Should be greater or equal to 0 and less than 1 to simulate Math.random()
    return 0.3
  }
}
