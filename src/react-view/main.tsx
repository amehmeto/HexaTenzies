import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { configureStoreWith } from '../app/store'
import { RealRandomDiceProvider } from '../infrastructure/randomDiceProvider/RealRandomDiceProvider'
import { Dependencies } from '../app/dependencies'
import { UuidIdProvider } from '../infrastructure/idProvider/UuidIdProvider'

const dependencies: Dependencies = {
  randomDiceProvider: new RealRandomDiceProvider(),
  idProvider: new UuidIdProvider(),
}

const store = configureStoreWith(dependencies)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type ReduxStore = typeof store
