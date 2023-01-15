import { RandomNumberProvider } from '../../core/dice/ports/randomNumberProvider'

export class RealRandomNumberProvider implements RandomNumberProvider {
  generate(): number {
    return Math.random()
  }
}
