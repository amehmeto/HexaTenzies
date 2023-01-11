import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { diceSlice } from '../core/dice/diceSlice'
import { Dependencies } from './dependencies'

const rootReducer = combineReducers({
  dice: diceSlice.reducer,
})

export const configureStoreWith = (dependencies: Dependencies) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: {
          extraArgument: dependencies,
        },
      }),
  })
