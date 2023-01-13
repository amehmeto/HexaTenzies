import { RollDiceUseCase } from './RollDiceUseCase'
import { RandomNumberProvider } from '../ports/randomNumberProvider'
import { InMemoryRandomNumberProvider } from '../../../infrastructure/randomNumberProvider/InMemoryRandomNumberProvider'
import { IdProvider } from '../ports/IdProvider'
import { InMemoryIdProvider } from '../../../infrastructure/idProvider/InMemoryIdProvider'
import { Die } from '../entities/Die'

describe('Roll Dice Use Case', () => {
  let randomDiceProvider: RandomNumberProvider =
    new InMemoryRandomNumberProvider()
  let idProvider: IdProvider = new InMemoryIdProvider()
  let generateRandomDiceUseCase = new RollDiceUseCase(
    randomDiceProvider,
    idProvider,
  )

  it('should generate 10 random die', () => {
    const thrownDice = generateRandomDiceUseCase.execute()

    expect(thrownDice.length).toStrictEqual(10)
  })

  it('should generate 10 random dice', () => {
    const expectedNumberOfDices = 10

    const thrownDice1 = generateRandomDiceUseCase.execute()
    const thrownDice = generateRandomDiceUseCase.execute()

    thrownDice.forEach((die) => expect(die).toBeInstanceOf(Die))
    expect(thrownDice.length).toBe(expectedNumberOfDices)
  })

  it('should have a value between 1 and 6', () => {
    const thrownDice = generateRandomDiceUseCase.execute()
    const firstDieValue = thrownDice[0].props.value

    expect(firstDieValue).toBeGreaterThanOrEqual(1)
    expect(firstDieValue).toBeLessThanOrEqual(6)
  })
})
