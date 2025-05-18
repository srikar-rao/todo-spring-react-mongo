import type { Todo } from '../../models/TodoModel';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TodoGridState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoGridState = {
  todos: [],
  loading: false,
  error: null,
};

const todoGridSlice = createSlice({
  name: 'todoGrid',
  initialState,
  reducers: {
    fetchTodosRequest: (state) => {
      state.loading = true;
    },
    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.todos = [];
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
} = todoGridSlice.actions;

export default todoGridSlice.reducer;
