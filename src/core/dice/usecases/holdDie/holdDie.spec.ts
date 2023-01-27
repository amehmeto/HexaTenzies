import { ReduxStore } from '../../../../react-view/main'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { InMemoryRandomNumberProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomNumberProvider'
import { configureStoreWith } from '../../../../app/store'
import { IdProvider } from '../../ports/IdProvider'
import { RandomNumberProvider } from '../../ports/randomNumberProvider'
import { rollDice } from '../rollDice/rollDice'
import { holdDie } from '../../diceSlice'

describe('Hold Die', () => {
  let store: ReduxStore
  let idProvider: IdProvider
  let randomNumberProvider: RandomNumberProvider

  beforeEach(async () => {
    idProvider = new InMemoryIdProvider()
    randomNumberProvider = new InMemoryRandomNumberProvider()
    const dependencies = {
      idProvider: idProvider,
      randomNumberProvider: randomNumberProvider,
    }
    store = configureStoreWith(dependencies)
    await store.dispatch(rollDice())
  })

  it('should hold the die', async () => {
    const dieId = 'uuid'

    await store.dispatch(holdDie(dieId))
    const dice = store.getState().dice.dice
    const heldDie = dice.find((die) => die.id === dieId)

    expect(heldDie!.props.isHeld).toBeTruthy()
  })

  it('should release a held die', async () => {
    const dieId = 'uuid'

    await store.dispatch(holdDie(dieId))
    const dice1 = store.getState().dice.dice
    const heldDie1 = dice1.find((die) => die.id === dieId)
    expect(heldDie1!.props.isHeld).toBeTruthy()

    await store.dispatch(holdDie(dieId))
    const dice = store.getState().dice.dice
    const heldDie = dice.find((die) => die.id === dieId)

    expect(heldDie!.props.isHeld).toBeFalsy()
  })
})
