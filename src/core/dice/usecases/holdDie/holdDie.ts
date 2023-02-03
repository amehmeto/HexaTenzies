import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from '../../diceSlice'
import { DieMapper } from '../../mappers/DieMapper'

type State = typeof initialState
export const holdDieReducer: CaseReducer<State, PayloadAction<string>> = (
  state,
  action,
) => {
  const dies = state.dice.dies
  const dieIndex = dies.findIndex((die) => die.id === action.payload)
  const dieToBeHeld = dies[dieIndex]
  const die = DieMapper.fromViewModel(dieToBeHeld)
  die.hold()
  dies[dieIndex] = DieMapper.toViewModel(die)
}
