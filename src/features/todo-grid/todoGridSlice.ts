import type { Todo } from '../../models/TodoModel';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TodoGridState {
  todos: Todo[];
  lastFetchedAt: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TodoGridState = {
  todos: [],
  lastFetchedAt: null,
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
      state.lastFetchedAt = new Date().toISOString();
    },
    fetchTodosFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.todos = [];
    },
    deleteTodoRequest: (state, _action: PayloadAction<number>) => {
      state.loading = true;
    },
    deleteTodoSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    deleteTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatedTodoRequest: (state, _action: PayloadAction<Todo>) => {
      state.loading = true;
      state.error = null;
    },
    updatedTodoSuccess: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
      state.loading = false;
    },
    updatedTodoFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  updatedTodoRequest,
  updatedTodoSuccess,
  updatedTodoFailure,
} = todoGridSlice.actions;

export default todoGridSlice.reducer;
