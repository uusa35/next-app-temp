import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Users } from '../../types';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

const initialState: Users = {
  data: [],
  meta: {},
  links: {},
  user: {
    element: {
      id: '',
      name: '',
      name_ar: '',
      name_en: '',
      email: '',
    },
  },
};

// HERE IS THE STATE OF USERS
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state: typeof initialState, action: PayloadAction<any>) => {},
    setUsers: (state, action: PayloadAction<typeof initialState>) => {
      return {
        ...action.payload,
        user: state.user,
      };
    },
    getUser: (
      state: typeof initialState,
      action: PayloadAction<{} | null>
    ) => {},
    setUser: (state, action: PayloadAction<any>) => {
      // STATE OF USERS
      return {
        ...state,
        user: action.payload,
      };
    },
    resetUsers: (state: typeof initialState, action: PayloadAction<any>) => {
      return initialState;
    },
    resetUser: (state: typeof initialState, action: PayloadAction<any>) => {
      return {
        ...state,
        user: {
          element: {
            id: '',
            name: '',
            name_ar: '',
            name_en: '',
            email: '',
          },
        },
      };
    },
  },
});
export const selectedUsers = (state: RootState) => state.users;
export const { getUsers, setUsers, getUser, setUser, resetUsers, resetUser } =
  usersSlice.actions;
