import { dieDataBuilder } from './dieDataBuilder'
import { Dice } from '../entities/Dice'
import { InMemoryIdProvider } from '../../../infrastructure/idProvider/InMemoryIdProvider'
import { DiceMapper } from '../mappers/DiceMapper'

export function diceDataBuilder(die = {}, attempts = 0) {
  const NUMBER_OF_DIE = 10
  const defaultDie = {
    props: {
      value: 6,
      isHeld: false,
    },
  }
  const dice = new Dice(
    new InMemoryIdProvider(),
    false,
    attempts,
    Array(NUMBER_OF_DIE).fill(dieDataBuilder({ ...defaultDie, ...die })),
  )
  return DiceMapper.toViewModel(dice)
}
