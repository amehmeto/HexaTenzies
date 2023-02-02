import { dieDataBuilder } from './dieDataBuilder'
import { DieMapper } from '../mappers/DieMapper'

export function diceDataBuilder(die = {}) {
  const NUMBER_OF_DIE = 10
  const defaultDie = {
    props: {
      value: 6,
      isHeld: false,
    },
  }
  return Array(NUMBER_OF_DIE)
    .fill(dieDataBuilder({ ...defaultDie, ...die }))
    .map((_die) => DieMapper.toViewModel(_die))
}
