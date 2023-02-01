import { createSlice } from '@reduxjs/toolkit'
import { rollDice } from './usecases/rollDice/rollDice'
import { holdDieReducer } from './usecases/holdDie/holdDie'
import { Dice } from './entities/Dice'
import { DieViewModel } from './mappers/DieMapper'

// type Tuple10<T> = [T, T, T, T, T, T, T, T, T, T]
//
// function initDice(): Tuple10<DieViewModel> {
//   const new Dice()
//   return [
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//     undefined,
//   ]
// }

export const initialState = {
  dice: [] as DieViewModel[],
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
  },
})

export const { holdDie } = diceSlice.actions
