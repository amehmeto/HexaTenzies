import { createSlice } from '@reduxjs/toolkit'
import { rollDice } from './usecases/rollDice/rollDice'
import { holdDie } from './usecases/holdDie/holdDie'
import { DieViewModel } from './mappers/DieMapper'
import { initializeDice } from './usecases/initializeDice/initializeDice'
import { checkTenzies } from './usecases/checkTenzies/checkTenzies'

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
  },
  extraReducers: (builder) => {
    builder.addCase(rollDice.fulfilled, (state, action) => {
      state.dice = action.payload
    })
    builder.addCase(initializeDice.fulfilled, (state, action) => {
      state.dice = action.payload
    })
    builder.addCase(checkTenzies.fulfilled, (state, action) => {
      state.dice.isTenzies = action.payload
    })
    builder.addCase(holdDie.fulfilled, (state, action) => {
      state.dice = action.payload
    })
  },
})

