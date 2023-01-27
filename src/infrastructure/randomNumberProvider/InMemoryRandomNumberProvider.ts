import { RandomNumberProvider } from '../../core/dice/ports/randomNumberProvider'

export class InMemoryRandomNumberProvider implements RandomNumberProvider {
  private controlledRandomNumber = 0.3

  generate(): number {
    // Should be greater or equal to 0 and less than 1 to simulate Math.random()
    return this.controlledRandomNumber
  }

  with(number: number): void {
    this.controlledRandomNumber = number
  }
}
