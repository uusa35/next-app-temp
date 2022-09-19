import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { locale } from '../../types';

interface localeSliceState {
  locale: locale;
}

const initialState: locale = {
  isRTL: true,
  dir: 'rtl',
  lang: 'ar',
  otherLang: 'en',
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      return {
        isRTL: action.payload === 'ar',
        lang: action.payload,
        otherLang: action.payload === 'ar' ? 'en' : 'ar',
        dir: action.payload === 'ar' ? 'rtl' : 'ltr',
      };
    },
  },
});

export const { setLocale } = localeSlice.actions;
