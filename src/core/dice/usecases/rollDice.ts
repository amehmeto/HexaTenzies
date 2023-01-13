import { createAsyncThunk } from '@reduxjs/toolkit'
import { Die } from '../entities/Die'
import { RollDiceUseCase } from './RollDiceUseCase'
import { Dependencies } from '../../../app/dependencies'

type ExtraDependencies = {
  extra: Dependencies
}

export const rollDice = createAsyncThunk<Die[], void, ExtraDependencies>(
  `dice/rollDice`,
  async (thunkAPI, { extra: { randomNumberProvider, idProvider } }) => {
    return new RollDiceUseCase(randomNumberProvider, idProvider).execute()
  },
)
