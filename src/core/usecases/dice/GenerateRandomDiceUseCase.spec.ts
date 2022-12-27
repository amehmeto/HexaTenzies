import { describe, expect, it } from 'vitest'
import { GenerateRandomDiceUseCase } from './GenerateRandomDiceUseCase'
import { RandomDiceProvider } from '../../ports/dice/randomDiceProvider'
import { InMemoryRandomDiceProvider } from '../../../infrastructure/randomDiceProvider/InMemoryRandomDiceProvider'

describe('Generate Random Dice Use Case', () => {
  let randomDiceProvider: RandomDiceProvider = new InMemoryRandomDiceProvider()
  let generateRandomDiceUseCase = new GenerateRandomDiceUseCase(
    randomDiceProvider,
  )
  it('should generate 10 random die value', () => {
    const thrownDice = generateRandomDiceUseCase.execute()

    expect(thrownDice.length).toStrictEqual(10)
  })

  it('should generate 10 numbers value', () => {
    const thrownDice = generateRandomDiceUseCase.execute()

    thrownDice.forEach((die, index) => {
      expect(thrownDice[index]).toBeTypeOf('number')
    })
  })
})
