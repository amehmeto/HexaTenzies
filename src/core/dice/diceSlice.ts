import { createSlice } from '@reduxjs/toolkit'
import { Die } from './entities/Die'
import { rollDice } from './usecases/rollDice'

export const initialState = {
  dice: [] as Die[],
  loading: false,
  error: null,
}

export const diceSlice = createSlice({
  name: 'dice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(rollDice.fulfilled, (state, action) => {
      console.log(action.payload)
      state.dice = action.payload
    })
  },
})
