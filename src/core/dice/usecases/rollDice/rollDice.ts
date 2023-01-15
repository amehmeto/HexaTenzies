import { createAsyncThunk } from '@reduxjs/toolkit'
import { Die } from '../../entities/Die'
import { RollDiceUseCase } from './RollDiceUseCase'
import { ExtraDependencies } from '../../extraDependencies'

export const rollDice = createAsyncThunk<Die[], void, ExtraDependencies>(
  `dice/rollDice`,
  async (thunkAPI, { extra: { randomNumberProvider, idProvider } }) => {
    return new RollDiceUseCase(randomNumberProvider, idProvider).execute()
  },
)
