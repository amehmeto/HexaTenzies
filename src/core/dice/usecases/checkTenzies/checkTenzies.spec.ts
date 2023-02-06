import { dieDataBuilder } from '../../data-builders/dieDataBuilder'
import { diceDataBuilder } from '../../data-builders/diceDataBuilder'
import { initializeDice } from '../initializeDice/initializeDice'
import { ReduxStore } from '../../../../react-view/main'
import { IdProvider } from '../../ports/IdProvider'
import { InMemoryRandomnessProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomnessProvider'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { configureStoreWith } from '../../../../app/store'
import { checkTenzies } from './checkTenzies'
import { DieMapper } from '../../mappers/DieMapper'
import { Dice } from '../../entities/Dice'
import { rollDice } from '../rollDice/rollDice'
import { DiceMapper } from '../../mappers/DiceMapper'

async function triggerCheckTenziesUseCase(store: ReduxStore) {
  await store.dispatch(checkTenzies())
  return store.getState().dice.dice.isTenzies
}

describe('Check Tenzies Use Case', () => {
  let store: ReduxStore
  let idProvider: IdProvider
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

  it('should be a Tenzies when all held dies values are the same', async () => {
    const sameDie = dieDataBuilder({ props: { isHeld: true, value: 6 } })
    const winningDice = diceDataBuilder(sameDie)

    await store.dispatch(initializeDice(winningDice))

    const isTenzies = await triggerCheckTenziesUseCase(store)

    expect(isTenzies).toBeTruthy()
  })

  it.each([
    [
      [
        dieDataBuilder({ props: { isHeld: false, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
      ],
    ],
    [
      [
        dieDataBuilder({ props: { isHeld: true, value: 5 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
        dieDataBuilder({ props: { isHeld: true, value: 6 } }),
      ],
    ],
  ])(
    'should not be a Tenzies when one die is non held or dies values are not the same',
    async (dies) => {
      const domainDies = dies.map((die) => DieMapper.fromViewModel(die))
      const losingDice = new Dice(idProvider, false, 0, domainDies)

      await store.dispatch(initializeDice(DiceMapper.toViewModel(losingDice)))

      await store.dispatch(rollDice())
      const isTenzies = await triggerCheckTenziesUseCase(store)

      expect(isTenzies).toBeFalsy()
    },
  )
})
