import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Dependencies } from '../../app/dependencies'
import { Die } from './entities/Die'
import { GenerateRandomDiceUseCase } from './usecases/GenerateRandomDiceUseCase'

type ExtraDependencies = {
  extra: Dependencies
}

export const rollDice = createAsyncThunk<Die[], void, ExtraDependencies>(
  `dice/rollDice`,
  async (thunkAPI, { extra: { randomDiceProvider, idProvider } }) => {
    const dice = new GenerateRandomDiceUseCase(
      randomDiceProvider,
      idProvider,
    ).execute()
    return Promise.resolve(dice)
  },
)

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
      state.dice.concat(action.payload)
      return state
    })
  },
})
