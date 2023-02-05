import { Die } from '../entities/Die'
import { DieMapper, DieViewModel } from '../mappers/DieMapper'

export function dieDataBuilder(die = {}): DieViewModel {
  const tempDie = new Die('uuid', {
    value: 2,
    isHeld: false,
    isCorrect: false,
  })
  const defaultDie = DieMapper.toViewModel(tempDie)

  return { ...defaultDie, ...die }
}
