import { RandomnessProvider } from '../core/dice/ports/randomnessProvider'
import { IdProvider } from '../core/dice/ports/IdProvider'

export interface Dependencies {
  randomnessProvider: RandomnessProvider
  idProvider: IdProvider
}
