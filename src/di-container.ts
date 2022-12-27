import { RandomDiceProvider } from './core/ports/dice/randomDiceProvider'
import { RealRandomDiceProvider } from './infrastructure/randomDiceProvider/RealRandomDiceProvider'
import { GenerateRandomDiceUseCase } from './core/usecases/dice/GenerateRandomDiceUseCase'

export const randomDiceProvider: RandomDiceProvider =
  new RealRandomDiceProvider()

export const generateRandomDiceUseCase = new GenerateRandomDiceUseCase(
  randomDiceProvider,
)
