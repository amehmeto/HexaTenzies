import { Die } from '../entities/Die'
import { DieMapper } from '../mappers/DieMapper'

export function dieDataBuilder(die = {}) {
  const tempDie = new Die('uuid', {
    value: 2,
    isHeld: false,
  })
  const defaultDie = DieMapper.toViewModel(tempDie)

  return { ...defaultDie, ...die }
}
