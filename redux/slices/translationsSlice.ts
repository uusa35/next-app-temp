import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = [];

export const translationsSlice = createSlice({
  name: 'translations',
  initialState,
  reducers: {
    getTranslations: (state, action: PayloadAction) => {},
    setTranslations: (state, action: PayloadAction<any>) => action.payload,
  },
});

export const { setTranslations, getTranslations } = translationsSlice.actions;
