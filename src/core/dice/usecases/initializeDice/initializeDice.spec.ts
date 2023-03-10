import { initializeDice } from './initializeDice'
import { ReduxStore } from '../../../../react-view/main'
import { InMemoryRandomnessProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomnessProvider'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { configureStoreWith } from '../../../../app/store'
import { diceDataBuilder } from '../../data-builders/diceDataBuilder'
import { DiceViewModel } from '../../mappers/DiceMapper'

async function triggerInitializeDiceUseCase(
  store: ReduxStore,
  dice?: DiceViewModel,
): Promise<DiceViewModel> {
  await store.dispatch(initializeDice(dice))
  return store.getState().dice.dice
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

  it('should initialize 10 die with a value of 6 and non held by default', async () => {
    const expectedDice = diceDataBuilder({
      props: {
        value: 6,
        isHeld: false,
        isCorrect: false,
      },
    })

    const initializedDice = await triggerInitializeDiceUseCase(store)

    expect(initializedDice.dies).toStrictEqual(expectedDice.dies)
  })

  it('should initialize all 10 dies with unique id', async () => {
    const expectedId = 'given id'
    idProvider.with(expectedId)

    const initializedDice = await triggerInitializeDiceUseCase(store)

    initializedDice.dies.forEach((die) => {
      expect(die.id).toStrictEqual(expectedId)
    })
  })

  it('should initialize dice with given die props', async () => {
    const givenInitialDie = {
      props: {
        value: 3,
        isHeld: true,
      },
    }
    const expectedDice = diceDataBuilder(givenInitialDie)

    const initializedDice = await triggerInitializeDiceUseCase(
      store,
      expectedDice,
    )

    expect(initializedDice.dies).toStrictEqual(expectedDice.dies)
  })

  it('should initialize dice with -1 attempts by default', async () => {
    const initializedDice = await triggerInitializeDiceUseCase(store)

    // -1 because the dice is automatically rolled once
    expect(initializedDice.attempts).toBe(-1)
  })


  it('should initialize dice with given attempts', async () => {
    const dice = diceDataBuilder({ })


    const initializedDice = await triggerInitializeDiceUseCase(store)

    expect(initializedDice.attempts).toBe(-1)
  })
})
