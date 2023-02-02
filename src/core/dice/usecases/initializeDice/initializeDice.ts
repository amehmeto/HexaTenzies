import { createAsyncThunk } from '@reduxjs/toolkit'
import { DieViewModel } from '../../mappers/DieMapper'
import { ExtraDependencies } from '../../extraDependencies'
import { Dice } from '../../entities/Dice'
import { DiceMapper } from '../../mappers/DiceMapper'

export const initializeDice = createAsyncThunk<
  DieViewModel[],
  void,
  ExtraDependencies
>('dice/initializeDice', async (thunkApi, { extra: { idProvider } }) => {
  const dice = new Dice(idProvider)
  return DiceMapper.toViewModel(dice)
})
