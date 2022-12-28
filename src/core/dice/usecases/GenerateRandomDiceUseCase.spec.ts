import { describe, expect, it } from 'vitest'
import { GenerateRandomDiceUseCase } from './GenerateRandomDiceUseCase'
import { RandomDiceProvider } from '../ports/randomDiceProvider'
import { InMemoryRandomDiceProvider } from '../../../infrastructure/randomDiceProvider/InMemoryRandomDiceProvider'
import { IdProvider } from '../ports/IdProvider'
import { InMemoryIdProvider } from '../../../infrastructure/idProvider/InMemoryIdProvider'
import { Die } from '../entities/Die'

describe('Generate Random Dice Use Case', () => {
  let randomDiceProvider: RandomDiceProvider = new InMemoryRandomDiceProvider()
  let idProvider: IdProvider = new InMemoryIdProvider()
  let generateRandomDiceUseCase = new GenerateRandomDiceUseCase(
    randomDiceProvider,
    idProvider,
  )

  it('should generate 10 random die', () => {
    const thrownDice = generateRandomDiceUseCase.execute()

    expect(thrownDice.length).toStrictEqual(10)
  })

  it('should generate 10 numbers value', () => {
    const thrownDice = generateRandomDiceUseCase.execute()

    thrownDice.forEach((die) => expect(die).toBeInstanceOf(Die))
  })
})
