import { createAsyncThunk } from '@reduxjs/toolkit'
import { Dice } from '../../entities/Dice'
import { ExtraDependencies } from '../../extraDependencies'
import { DieViewModel } from '../../mappers/DieMapper'
import { DiceMapper } from '../../mappers/DiceMapper'

export const rollDice = createAsyncThunk<
  DieViewModel[],
  void,
  ExtraDependencies
>(
  `dice/rollDice`,
  async (thunkAPI, { extra: { randomnessProvider, idProvider } }) => {
    const dice = new Dice(idProvider).roll(randomnessProvider)
    return DiceMapper.toViewModel(dice)
  },
)
