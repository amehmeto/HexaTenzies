import { initializeDice } from './initializeDice'
import { ReduxStore } from '../../../../react-view/main'
import { IdProvider } from '../../ports/IdProvider'
import { InMemoryRandomnessProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomnessProvider'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { configureStoreWith } from '../../../../app/store'
import { diceDataBuilder } from '../../data-builders/diceDataBuilder'

async function triggerInitializeDiceUseCase(store: ReduxStore) {
  await store.dispatch(initializeDice())
  const initializedDice = store.getState().dice.dice
  return initializedDice
}

describe('Initialize Dice', () => {
  let store: ReduxStore
  let idProvider: InMemoryIdProvider
  let randomnessProvider: InMemoryRandomnessProvider

  beforeEach(() => {
    idProvider = new InMemoryIdProvider()
    randomnessProvider = new InMemoryRandomnessProvider()
    const dependencies = {
      idProvider: idProvider,
      randomnessProvider: randomnessProvider,
    }
    store = configureStoreWith(dependencies)
  })

  it('should initialize 10 die with a value of 6 and non held', async () => {
    const expectedDice = diceDataBuilder({
      props: {
        value: 6,
        isHeld: false,
      },
    })

    const initializedDice = await triggerInitializeDiceUseCase(store)

    expect(initializedDice).toStrictEqual(expectedDice)
  })

  it('should initialize all 10 dies with unique id', async () => {
    const expectedId = 'given id'
    idProvider.with(expectedId)

    const initializedDice = await triggerInitializeDiceUseCase(store)

    initializedDice.forEach((die) => {
      expect(die.id).toStrictEqual(expectedId)
    })
  })
})
