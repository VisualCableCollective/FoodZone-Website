import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import addressReducer from "../components/AddressInput/addressSlice";
import orderReducer from "../components/Order/orderTypeSlice";
import foodZoneReducer from "../features/FoodZoneApi/foodZoneSlice";


export function makeStore() {
    return configureStore({
        reducer: {
            address: addressReducer,
            orderType: orderReducer,
            foodZone: foodZoneReducer
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