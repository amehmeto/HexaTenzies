import { RandomNumberProvider } from '../../core/dice/ports/randomNumberProvider'

export class RealRandomNumberProvider implements RandomNumberProvider {
  generate(): number {
    /*const DIE_MAX_VALUE = 6
    return ~~(Math.random() * DIE_MAX_VALUE) + 1*/
    return Math.random()
  }
}
