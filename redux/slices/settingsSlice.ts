import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Setting } from './../../types';

const initialState: Setting = {
  name_ar: '',
  name_en: '',
  description_ar: '',
  description_en: '',
};
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    getSettings: (state, action: PayloadAction) => {},
    setSettings: (state, action: PayloadAction<any>) => action.payload,
  },
});

export const { getSettings, setSettings } = settingsSlice.actions;
