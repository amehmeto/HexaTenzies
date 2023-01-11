import { RandomDiceProvider } from '../core/dice/ports/randomDiceProvider'
import { IdProvider } from '../core/dice/ports/IdProvider'

export interface Dependencies {
  randomDiceProvider: RandomDiceProvider
  idProvider: IdProvider
}
