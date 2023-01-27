import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { initialState } from '../../diceSlice'
import { Die } from '../../entities/Die'

type State = typeof initialState
export const holdDieReducer: CaseReducer<State, PayloadAction<string>> = (
  state,
  action,
) => {
  const dieIndex = state.dice.findIndex((die) => die.id === action.payload)
  const dieToBeHeld = state.dice[dieIndex]
  const die = Die.fromDTO(dieToBeHeld)
  die.hold()
  state.dice[dieIndex] = die.toDTO()
}
