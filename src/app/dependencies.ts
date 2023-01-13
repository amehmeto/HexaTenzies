import { RandomNumberProvider } from '../core/dice/ports/randomNumberProvider'
import { IdProvider } from '../core/dice/ports/IdProvider'

export interface Dependencies {
  randomNumberProvider: RandomNumberProvider
  idProvider: IdProvider
}
