import { createAsyncThunk } from '@reduxjs/toolkit'
import { DiceMapper } from '../../mappers/DiceMapper'
import { RootState } from '../../../../react-view/main'
import { Dependencies } from '../../../../app/dependencies'

export const checkTenzies = createAsyncThunk<
  boolean,
  void,
  {
    state: RootState
    extra: Dependencies
  }
>(
  'dice/checkTenzies',
  async (thunkArg, { getState, extra: { idProvider } }) => {
    const dice = getState().dice.dice
    const domainDice = DiceMapper.fromViewModel(idProvider, dice)
    domainDice.checkTenzies()
    return domainDice.isTenzies
  },
)
