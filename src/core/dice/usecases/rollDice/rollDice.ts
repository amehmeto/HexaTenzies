import { createAsyncThunk } from '@reduxjs/toolkit'
import { Dice } from '../../entities/Dice'
import { DieViewModel } from '../../mappers/DieMapper'
import { DiceMapper } from '../../mappers/DiceMapper'
import { Dependencies } from '../../../../app/dependencies'
import { RootState } from '../../../../react-view/main'
import { DiceViewModel } from '../../diceSlice'

function isNotEmpty(diceFromState: DieViewModel[]) {
  return diceFromState && diceFromState.length !== 0
}

export const rollDice = createAsyncThunk<
  DiceViewModel,
  void,
  {
    state: RootState
    extra: Dependencies
  }
>(
  `dice/rollDice`,
  async (thunkArg, { getState, extra: { randomnessProvider, idProvider } }) => {
    const rawDice = getState().dice.dice

    const { isTenzies, dies } = DiceMapper.fromViewModel(idProvider, rawDice)

    const dice = isNotEmpty(dies)
      ? new Dice(idProvider, isTenzies, dies)
      : new Dice(idProvider)

    dice.roll(randomnessProvider)

    return DiceMapper.toViewModel(dice)
  },
)
