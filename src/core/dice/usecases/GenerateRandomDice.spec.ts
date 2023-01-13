import { ReduxStore } from '../../../react-view/main'
import { configureStoreWith } from '../../../app/store'
import { Dependencies } from '../../../app/dependencies'
import { InMemoryIdProvider } from '../../../infrastructure/idProvider/InMemoryIdProvider'
import { InMemoryRandomDiceProvider } from '../../../infrastructure/randomDiceProvider/InMemoryRandomDiceProvider'
import { rollDice } from '../diceSlice'
import { Die } from '../entities/Die'
import { IdProvider } from '../ports/IdProvider'
import { RandomDiceProvider } from '../ports/randomDiceProvider'

function dieDataBuilder() {
  return new Die('uuid', {
    isHeld: false,
    value: 0,
  })
}

describe('Generate Random Dice', () => {
  let store: ReduxStore
  let idProvider: IdProvider
  let randomDiceProvider: RandomDiceProvider

  beforeEach(() => {
    idProvider = new InMemoryIdProvider()
    randomDiceProvider = new InMemoryRandomDiceProvider()
    const dependencies = {
      idProvider: idProvider,
      randomDiceProvider: randomDiceProvider,
    }
    store = configureStoreWith(dependencies)
  })

  it('should generate 10 random dice', async () => {
    const expectedDice = Array(1).fill(dieDataBuilder())

    await store.dispatch(rollDice())
    const generatedDice = store.getState().dice.dice

    expect(generatedDice).toStrictEqual(expectedDice)
  })
})
