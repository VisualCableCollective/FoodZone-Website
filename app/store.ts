import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import addressReducer from "../components/AddressInput/addressSlice";


export function makeStore() {
    return configureStore({
        reducer: {
            address: addressReducer
        },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    null,
    Action<string>
    >

export default store