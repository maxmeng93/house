import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './index'

interface GlobalState {
  scale: number
}

const initialState: GlobalState = {
  scale: 1
}

export const globalData = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setScale: (state, action) => {
      state.scale = action.payload;
    },
  },
})

export const { setScale } = globalData.actions;

export const getScale = (state: RootState) => state.global.scale;

export default globalData.reducer;