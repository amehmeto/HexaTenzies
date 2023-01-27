import { createSlice } from '@reduxjs/toolkit'
import { DieDTO } from './entities/Die'
import { rollDice } from './usecases/rollDice/rollDice'
import { holdDieReducer } from './usecases/holdDie/holdDie'

type Tuple10<T> = [T, T, T, T, T, T, T, T, T]

export const initialState = {
  dice: [] as DieDTO[],
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
