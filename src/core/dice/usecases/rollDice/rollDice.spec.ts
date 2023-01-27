import { ReduxStore } from '../../../../react-view/main'
import { configureStoreWith } from '../../../../app/store'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { InMemoryRandomNumberProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomNumberProvider'
import { Die } from '../../entities/Die'
import { IdProvider } from '../../ports/IdProvider'
import { RandomNumberProvider } from '../../ports/randomNumberProvider'
import { rollDice } from './rollDice'

function dieDataBuilder() {
  return new Die('uuid', {
    value: 2,
    isHeld: false,
  })
}

describe('Generate Random Dice', () => {
  let store: ReduxStore
  let idProvider: IdProvider
  let randomNumberProvider: RandomNumberProvider

  beforeEach(() => {
    idProvider = new InMemoryIdProvider()
    randomNumberProvider = new InMemoryRandomNumberProvider()
    const dependencies = {
      idProvider: idProvider,
      randomNumberProvider: randomNumberProvider,
    }
    store = configureStoreWith(dependencies)
  })

  it('should generate 10 random die', async () => {
    const NUMBER_OF_DIE = 10
    const expectedDice = Array(NUMBER_OF_DIE)
      .fill(dieDataBuilder())
      .map((die) => die.toDTO())

    await store.dispatch(rollDice())
    const generatedDice = store.getState().dice.dice

    expect(generatedDice).toStrictEqual(expectedDice)
  })

  it('should regenerate a new dice after every roll', async () => {
    const expectedNumberOfDices = 10

    await store.dispatch(rollDice())
    const firstDice = store.getState().dice.dice

    await store.dispatch(rollDice())
    const secondDice = store.getState().dice.dice

    expect(firstDice.length).toBe(expectedNumberOfDices)
    expect(secondDice.length).toBe(expectedNumberOfDices)
    expect(firstDice).not.toStrictEqual(secondDice)
  })

  it('should have a value between 1 and 6', async () => {
    await store.dispatch(rollDice())
    const firstDieValue = store.getState().dice.dice[0].props.value

    expect(firstDieValue).toBeGreaterThanOrEqual(1)
    expect(firstDieValue).toBeLessThanOrEqual(6)
  })
})
