import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import { diceSlice } from '../core/dice/diceSlice'

const rootReducer = combineReducers({
  dice: diceSlice.reducer,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
