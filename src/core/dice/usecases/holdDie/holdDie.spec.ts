import { ReduxStore } from '../../../../react-view/main'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { InMemoryRandomnessProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomnessProvider'
import { configureStoreWith } from '../../../../app/store'
import { IdProvider } from '../../ports/IdProvider'
import { RandomnessProvider } from '../../ports/randomnessProvider'
import { rollDice } from '../rollDice/rollDice'
import { holdDie } from '../../diceSlice'

describe('Hold Die', () => {
  let store: ReduxStore
  let idProvider: IdProvider
  let randomNumberProvider: RandomnessProvider

  beforeEach(async () => {
    idProvider = new InMemoryIdProvider()
    randomNumberProvider = new InMemoryRandomnessProvider()
    const dependencies = {
      idProvider: idProvider,
      randomnessProvider: randomNumberProvider,
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
