import { ReduxStore } from '../../../../react-view/main'
import { configureStoreWith } from '../../../../app/store'
import { InMemoryIdProvider } from '../../../../infrastructure/idProvider/InMemoryIdProvider'
import { InMemoryRandomnessProvider } from '../../../../infrastructure/randomNumberProvider/InMemoryRandomnessProvider'
import { Die } from '../../entities/Die'
import { IdProvider } from '../../ports/IdProvider'
import { rollDice } from './rollDice'
import { Dice } from '../../entities/Dice'
import { DieMapper } from '../../mappers/DieMapper'
import { DiceMapper } from '../../mappers/DiceMapper'

function dieDataBuilder() {
  return new Die('uuid', {
    value: 2,
    isHeld: false,
  })
}

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
    const NUMBER_OF_DIE = 10
    const expectedDice = Array(NUMBER_OF_DIE)
      .fill(dieDataBuilder())
      .map((die) => DieMapper.toViewModel(die))

    const generatedDice = await triggerRollDiceUseCase(store)

    expect(generatedDice).toStrictEqual(expectedDice)
  })

  it('should generate new dice after every roll', async () => {
    const expectedNumberOfDie = 10

    const firstDice = await triggerRollDiceUseCase(store)

    randomnessProvider.with(0.5)

    const secondDice = await triggerRollDiceUseCase(store)

    expect(firstDice.length).toBe(expectedNumberOfDie)
    expect(secondDice.length).toBe(expectedNumberOfDie)
    expect(firstDice).not.toStrictEqual(secondDice)
  })

  it('should have a value between 1 and 6 for each die', async () => {
    const generatedDice = await triggerRollDiceUseCase(store)

    generatedDice.forEach((die) => {
      const dieValue = die.props.value
      expect(dieValue).toBeGreaterThanOrEqual(1)
      expect(dieValue).toBeLessThanOrEqual(6)
    })
  })

  it('should roll only non held die', async () => {
    const dice = new Dice(idProvider, Array(10).fill(dieDataBuilder()))
    const expectedDice = DiceMapper.toViewModel(dice)

    const rolledDice = await triggerRollDiceUseCase(store)

    expect(rolledDice).toStrictEqual(expectedDice)
  })
})
