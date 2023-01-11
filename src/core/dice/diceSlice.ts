import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Dependencies } from '../../app/dependencies'
import { Die } from './entities/Die'

type ExtraDependencies = {
  extra: Dependencies
}

export const rollDice = createAsyncThunk<Die, void, ExtraDependencies>(
  `dice/rollDice`,
  async (thunkAPI, { extra: { randomDiceProvider, idProvider } }) => {
    const number = randomDiceProvider.generateRandomDieValue()
    const id = idProvider.getNew()
    return new Die(id, { value: number, isHeld: false })
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
      const payload = action.payload
      state.dice.push(payload)
    })
  },
})
