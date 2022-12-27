import { createSlice } from '@reduxjs/toolkit'
import { generateRandomDiceUseCase } from '../../../di-container'

export const diceSlice = createSlice({
  name: 'dice',
  initialState: generateRandomDiceUseCase.execute(),
  reducers: {},
})
