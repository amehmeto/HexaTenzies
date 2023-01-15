import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from '../../diceSlice'

type State = typeof initialState
export const holdDieReducer: CaseReducer<State, PayloadAction<string>> = (
  state,
  action,
) => {
  const dieIndex = state.dice.findIndex((die) => die.id === action.payload)
  const dieToBeHeld = state.dice[dieIndex]
  dieToBeHeld.hold()
}
