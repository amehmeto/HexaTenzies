import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from '../../diceSlice'
import { DieMapper } from '../../mappers/DieMapper'

type State = typeof initialState
export const holdDieReducer: CaseReducer<State, PayloadAction<string>> = (
  state,
  action,
) => {
  const dieIndex = state.dice.findIndex((die) => die.id === action.payload)
  const dieToBeHeld = state.dice[dieIndex]
  const die = DieMapper.fromViewModel(dieToBeHeld)
  die.hold()
  state.dice[dieIndex] = DieMapper.toViewModel(die)
}
