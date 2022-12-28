import { RandomDiceProvider } from './core/dice/ports/randomDiceProvider'
import { RealRandomDiceProvider } from './infrastructure/randomDiceProvider/RealRandomDiceProvider'
import { GenerateRandomDiceUseCase } from './core/dice/usecases/GenerateRandomDiceUseCase'
import { IdProvider } from './core/dice/ports/IdProvider'
import { UuidProvider } from './infrastructure/idProvider/UuidProvider'

export const randomDiceProvider: RandomDiceProvider =
  new RealRandomDiceProvider()
export const idProvider: IdProvider = new UuidProvider()

export const generateRandomDiceUseCase = new GenerateRandomDiceUseCase(
  randomDiceProvider,
  idProvider,
)
