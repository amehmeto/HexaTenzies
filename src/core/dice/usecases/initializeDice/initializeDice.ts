import { createAsyncThunk } from '@reduxjs/toolkit'
import { Dice } from '../../entities/Dice'
import { DiceMapper, DiceViewModel } from '../../mappers/DiceMapper'
import { Dependencies } from '../../../../app/dependencies'
import { RootState } from '../../../../react-view/main'

export const initializeDice = createAsyncThunk<
  DiceViewModel,
  DiceViewModel | undefined,
  {
    state: RootState
    extra: Dependencies
  }
>('dice/initializeDice', async (initialDice, { extra: { idProvider } }) => {
  const initializedDice =
    initialDice && initialDice.dies && initialDice.dies.length !== 0
      ? DiceMapper.fromViewModel(idProvider, initialDice)
      : new Dice(idProvider)
  return DiceMapper.toViewModel(initializedDice)
})
