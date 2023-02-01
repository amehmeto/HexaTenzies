import { RandomnessProvider } from '../../core/dice/ports/randomnessProvider'

export class InMemoryRandomnessProvider implements RandomnessProvider {
  private controlledRandomNumber = 0.3

  generate(): number {
    // Should be greater or equal to 0 and less than 1 to simulate Math.random()
    return this.controlledRandomNumber
  }

  with(number: number): void {
    this.controlledRandomNumber = number
  }
}
