import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState, AppThunk } from '../../app/store'

export interface FoodZoneState {
  isAuthenticated: boolean
}

const initialState: FoodZoneState = {
  isAuthenticated: false,
}

export const foodZoneSlice = createSlice({
  name: 'foodZone',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
})

export const { setIsAuthenticated } = foodZoneSlice.actions

export const selectIsAuthenticated = (state: AppState) => state.foodZone.isAuthenticated;

export default foodZoneSlice.reducer