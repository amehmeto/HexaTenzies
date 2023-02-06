import { ReduxStore } from '../../../../react-view/main'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { InMemoryRandomnessProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomnessProvider'
import { configureStoreWith } from '../../../../app/store'
import { IdProvider } from '../../ports/IdProvider'
import { RandomnessProvider } from '../../ports/randomnessProvider'
import { rollDice } from '../rollDice/rollDice'
import { initializeDice } from '../initializeDice/initializeDice'
import { DiceMapper } from '../../mappers/DiceMapper'
import { Dice } from '../../entities/Dice'
import { dieDataBuilder } from '../../data-builders/dieDataBuilder'
import { holdDie } from './holdDie'

async function triggerHoldDieUseCase(store: ReduxStore, dieId: string) {
  await store.dispatch(holdDie(dieId))
  const dice = store.getState().dice.dice
  return dice.dies.find((die) => die.id === dieId)
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

  it("should mark the die has correct when it's the first to be held", async () => {
    const dies = Array(10).fill(dieDataBuilder())
    const noHeldDieDice = new Dice(idProvider, false, 0, dies)
    const diceViewModel = DiceMapper.toViewModel(noHeldDieDice)

    await store.dispatch(initializeDice(diceViewModel))

    const heldDie = await triggerHoldDieUseCase(store, 'uuid')

    expect(heldDie!.props.isCorrect).toBeTruthy()
  })

  it('should mark the die has correct when value match previously held dice', async () => {
    const dies = Array(10).fill(dieDataBuilder({
      props: { value: 2 }
    }))
    dies[0] = dieDataBuilder({
      id: 'held die id',
      props: {
        value: 2,
        isHeld: true,
        isCorrect: false,
      },
    })
    const noHeldDieDice = new Dice(idProvider, false, 0, dies)
    const diceViewModel = DiceMapper.toViewModel(noHeldDieDice)

    await store.dispatch(initializeDice(diceViewModel))

    const heldDie = await triggerHoldDieUseCase(store, 'held die id')

    expect(heldDie!.props.isCorrect).toBeTruthy()
  })

  it('should mark the die has correct when previously held dice aren\'t correct', async () => {
    const dies = Array(10).fill(dieDataBuilder({
      props: { value: 2, isHeld: true,
        isCorrect: false,}
    }))
    dies[0] = dieDataBuilder({
      id: 'held die id',
      props: {
        value: 6,
        isHeld: false,
        isCorrect: false,
      },
    })
    const noHeldDieDice = new Dice(idProvider, false, 0, dies)
    const diceViewModel = DiceMapper.toViewModel(noHeldDieDice)

    await store.dispatch(initializeDice(diceViewModel))

    const heldDie = await triggerHoldDieUseCase(store, 'held die id')

    expect(heldDie!.props.isCorrect).toBeTruthy()
  })

  it('should not mark the die has correct when value doesn\'t match previously held dice', async () => {
    const dies = Array(10).fill(dieDataBuilder({
      props: { value: 2, isHeld: true, isCorrect: true }
    }))
    dies[0] = dieDataBuilder({
      id: 'held die id',
      props: {
        value: 6,
        isHeld: true,
        isCorrect: false,
      },
    })
    const noHeldDieDice = new Dice(idProvider, false, 0, dies)
    const diceViewModel = DiceMapper.toViewModel(noHeldDieDice)

    await store.dispatch(initializeDice(diceViewModel))

    const heldDie = await triggerHoldDieUseCase(store, 'held die id')

    expect(heldDie!.props.isCorrect).toBeFalsy()
  })
})
