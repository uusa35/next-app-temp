import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = false;
export const bootStrappedSlice = createSlice({
  name: 'bootStrapped',
  initialState,
  reducers: {
    enableBootStrapped: (state, action: PayloadAction) => true,
    disableBootStrapped: (state, action: PayloadAction) => false,
  },
});

export const { enableBootStrapped, disableBootStrapped } =
  bootStrappedSlice.actions;
