import { createAsyncThunk } from '@reduxjs/toolkit'
import { DieViewModel } from '../../mappers/DieMapper'
import { Dice } from '../../entities/Dice'
import { DiceMapper } from '../../mappers/DiceMapper'
import { Dependencies } from '../../../../app/dependencies'
import { RootState } from '../../../../react-view/main'

export const initializeDice = createAsyncThunk<
  DieViewModel[],
  DieViewModel[] | undefined,
  {
    state: RootState
    extra: Dependencies
  }
>('dice/initializeDice', async (initialDice, { extra: { idProvider } }) => {
  const initializedDice =
    initialDice && initialDice.length !== 0
      ? new Dice(idProvider, DiceMapper.fromViewModel(initialDice))
      : new Dice(idProvider)
  return DiceMapper.toViewModel(initializedDice)
})
