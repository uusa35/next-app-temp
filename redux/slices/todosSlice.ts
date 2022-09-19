import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todo } from '../../types';

const initialState: todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<string>) => {
      return [
        ...state,
        { id: Date.now(), name: action.payload, isDone: false },
      ];
    },
    removeToDo: (state, action: PayloadAction<number>) => {
      return state.filter((t) => t.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      let currentTodo = state.filter((t) => t.id === action.payload)[0];
      let filteredTodos = state.filter((t) => t.id !== action.payload);
      return [
        {
          id: action.payload,
          name: currentTodo.name,
          isDone: !currentTodo.isDone,
        },
        ...filteredTodos,
      ];
    },
    resetToDos: (state, action: PayloadAction<any>) => [],
  },
});

export const { addToDo, removeToDo, toggleComplete, resetToDos } =
  todosSlice.actions;
