import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState, AppThunk } from '../../app/store'

export interface CounterState {
    value: string
    status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterState = {
    value: '',
    status: 'idle',
}

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setAddress: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
})

export const { setAddress } = addressSlice.actions

export const selectAddress = (state: AppState) => state.address.value

export default addressSlice.reducer