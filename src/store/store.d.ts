import { reducer, store } from './index'

export type RootState = ReturnType<typeof reducer>

export type StoreDispatch = typeof store.dispatch

export type StoreThunkAction<P = {}> = (
  payload?: P
) => (dispatch: StoreDispatch, getState: () => RootState) => void | Promise<void>