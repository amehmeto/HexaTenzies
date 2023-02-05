import { createAsyncThunk } from '@reduxjs/toolkit'
import { DiceViewModel } from '../../diceSlice'
import { DiceMapper } from '../../mappers/DiceMapper'
import { RootState } from '../../../../react-view/main'
import { Dependencies } from '../../../../app/dependencies'

export const holdDie = createAsyncThunk<
  DiceViewModel,
  string,
  {
  state: RootState,
  extra: Dependencies,
}
> (
  'dice/holdDie',
  async (dieToBeHeldId, { getState, extra: { idProvider}}
  ) => {
    const currentDice = getState().dice.dice

    const dice = DiceMapper.fromViewModel(idProvider, currentDice)
    dice.hold(dieToBeHeldId)
    return  DiceMapper.toViewModel(dice)
  })
