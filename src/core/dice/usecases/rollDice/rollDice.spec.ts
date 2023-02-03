import { ReduxStore } from '../../../../react-view/main'
import { configureStoreWith } from '../../../../app/store'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { InMemoryRandomnessProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomnessProvider'
import { IdProvider } from '../../ports/IdProvider'
import { rollDice } from './rollDice'
import { Dice } from '../../entities/Dice'
import { DiceMapper } from '../../mappers/DiceMapper'
import { dieDataBuilder } from '../../data-builders/dieDataBuilder'
import { diceDataBuilder } from '../../data-builders/diceDataBuilder'
import { initializeDice } from '../initializeDice/initializeDice'

async function triggerRollDiceUseCase(store: ReduxStore) {
  await store.dispatch(rollDice())
  return store.getState().dice.dice
}

describe('Generate Random Dice', () => {
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

  it('should generate 10 random die', async () => {
    const expectedDice = diceDataBuilder(dieDataBuilder())

    const generatedDice = await triggerRollDiceUseCase(store)

    expect(generatedDice.dies).toStrictEqual(expectedDice.dies)
  })

  it('should generate new dice after every roll', async () => {
    const expectedNumberOfDie = 10

    randomnessProvider.with(0.1)

    const { dies: firstDice } = await triggerRollDiceUseCase(store)

    randomnessProvider.with(0.5)

    const { dies: secondDice } = await triggerRollDiceUseCase(store)

    expect(firstDice.length).toBe(expectedNumberOfDie)
    expect(secondDice.length).toBe(expectedNumberOfDie)
    expect(firstDice).not.toStrictEqual(secondDice)
  })

  it('should have a value between 1 and 6 for each die', async () => {
    const generatedDice = await triggerRollDiceUseCase(store)

    generatedDice.dies.forEach((die) => {
      const dieValue = die.props.value
      expect(dieValue).toBeGreaterThanOrEqual(1)
      expect(dieValue).toBeLessThanOrEqual(6)
    })
  })

  it('should roll only non held die', async () => {
    const expectedUnmodifiedProps = {
      props: {
        isHeld: true,
        value: 6,
      },
    }
    const heldAndNonHeldDiceMix = [
      dieDataBuilder(expectedUnmodifiedProps),
      dieDataBuilder(expectedUnmodifiedProps),
      dieDataBuilder(expectedUnmodifiedProps),
      ...Array(7).fill(dieDataBuilder()),
    ]
    const dice = new Dice(idProvider, false, heldAndNonHeldDiceMix)
    const initialDice = DiceMapper.toViewModel(dice)
    await store.dispatch(initializeDice(initialDice))

    const { dies: rolledDice } = await triggerRollDiceUseCase(store)
    const first3Die = [rolledDice[0], rolledDice[1], rolledDice[2]]

    first3Die.map((die) => {
      expect(die.props).toStrictEqual(expectedUnmodifiedProps.props)
    })
  })

  it('should be a Tenzies when all held dies values are the same', async () => {
    const sameDie = dieDataBuilder({ props: { isHeld: true, value: 6 } })
    const winningDice = diceDataBuilder(sameDie)

    await store.dispatch(initializeDice(winningDice))

    await store.dispatch(rollDice())
    const rolledDice = await triggerRollDiceUseCase(store)

    expect(rolledDice.isTenzies).toBeTruthy()
  })
})
