import { beforeEach, describe, expect, it } from 'vitest'
import { ReduxStore } from '../../../react-view/main'
import { configureStoreWith } from '../../../app/store'
import { Dependencies } from '../../../app/dependencies'
import { InMemoryIdProvider } from '../../../infrastructure/idProvider/InMemoryIdProvider'
import { InMemoryRandomDiceProvider } from '../../../infrastructure/randomDiceProvider/InMemoryRandomDiceProvider'
import { rollDice } from '../diceSlice'

describe('Generate Random Dice', () => {
  let store: ReduxStore
  let dependencies: Dependencies

  beforeEach(() => {
    dependencies = {
      idProvider: new InMemoryIdProvider(),
      randomDiceProvider: new InMemoryRandomDiceProvider(),
    }
    store = configureStoreWith(dependencies)
  })

  it('should generate 10 random dice', () => {
    store.dispatch(rollDice())
    const state = store.getState()

    expect(state).toBe('something')
  })
})
