import { createSlice } from '@reduxjs/toolkit'
import { rollDice } from './usecases/rollDice/rollDice'
import { holdDieReducer } from './usecases/holdDie/holdDie'
import { DieViewModel } from './mappers/DieMapper'
import { initializeDice } from './usecases/initializeDice/initializeDice'

export type DiceViewModel = {
  isTenzies: boolean
  dies: DieViewModel[]
}

const initialDice = {
  isTenzies: false,
  dies: [] as DieViewModel[],
}
export const initialState = {
  dice: initialDice,
  loading: false,
  error: null,
}

export const diceSlice = createSlice({
  name: 'dice',
  initialState,
  reducers: {
    holdDie: holdDieReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(rollDice.fulfilled, (state, action) => {
      state.dice = action.payload
    })
    builder.addCase(initializeDice.fulfilled, (state, action) => {
      state.dice = action.payload
    })
  },
})

export const { holdDie } = diceSlice.actions
