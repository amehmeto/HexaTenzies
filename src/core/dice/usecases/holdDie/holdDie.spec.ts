import { ReduxStore } from '../../../../react-view/main'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { InMemoryRandomnessProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomnessProvider'
import { configureStoreWith } from '../../../../app/store'
import { IdProvider } from '../../ports/IdProvider'
import { RandomnessProvider } from '../../ports/randomnessProvider'
import { rollDice } from '../rollDice/rollDice'
import { holdDie } from '../../diceSlice'

async function triggerHoldDieUseCase(store: ReduxStore, dieId: string) {
  await store.dispatch(holdDie(dieId))
  const dice = store.getState().dice.dice
  const heldDie = dice.dies.find((die) => die.id === dieId)
  return heldDie
}

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

    const heldDie = await triggerHoldDieUseCase(store, dieId)

    expect(heldDie!.props.isHeld).toBeTruthy()
  })

  it('should release a held die', async () => {
    const dieId = 'uuid'

    const heldDie1 = await triggerHoldDieUseCase(store, dieId)

    expect(heldDie1!.props.isHeld).toBeTruthy()

    const heldDie = await triggerHoldDieUseCase(store, dieId)

    expect(heldDie!.props.isHeld).toBeFalsy()
  })
})
