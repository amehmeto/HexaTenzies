import { createAsyncThunk } from '@reduxjs/toolkit'
import { DieDTO } from '../../entities/Die'
import { Dice } from '../../entities/Dice'
import { ExtraDependencies } from '../../extraDependencies'

export const rollDice = createAsyncThunk<DieDTO[], void, ExtraDependencies>(
  `dice/rollDice`,
  async (thunkAPI, { extra: { randomNumberProvider, idProvider } }) => {
    return new Dice(randomNumberProvider, idProvider).roll()
  },
)
