import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState, AppThunk } from '../../app/store'
import {OrderType} from "../../models/OrderType";

export interface OrderTypeState {
  value: OrderType
}

const initialState: OrderTypeState = {
  value: OrderType.None,
}

export const orderTypeSlice = createSlice({
  name: 'orderType',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setOrderType: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
})

export const { setOrderType } = orderTypeSlice.actions

export const selectOrderType = (state: AppState) => state.orderType.value

export default orderTypeSlice.reducer