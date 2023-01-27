import { Dice } from '../../entities/Dice'
import { RandomNumberProvider } from '../../ports/randomNumberProvider'
import { InMemoryRandomNumberProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomNumberProvider'
import { IdProvider } from '../../ports/IdProvider'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'

describe('Roll Dice Use Case', () => {
  let randomDiceProvider: RandomNumberProvider =
    new InMemoryRandomNumberProvider()
  let idProvider: IdProvider = new InMemoryIdProvider()
  let generateRandomDiceUseCase = new Dice(randomDiceProvider, idProvider)

  it('should generate 10 random die', () => {
    const thrownDice = generateRandomDiceUseCase.roll()

    expect(thrownDice.length).toStrictEqual(10)
  })

  it('should generate 10 random dice', () => {
    const expectedNumberOfDices = 10

    const thrownDice = generateRandomDiceUseCase.roll()

    expect(thrownDice.length).toBe(expectedNumberOfDices)
  })

  it('should have a value between 1 and 6', () => {
    const thrownDice = generateRandomDiceUseCase.roll()
    const firstDieValue = thrownDice[0].props.value

    expect(firstDieValue).toBeGreaterThanOrEqual(1)
    expect(firstDieValue).toBeLessThanOrEqual(6)
  })
})
