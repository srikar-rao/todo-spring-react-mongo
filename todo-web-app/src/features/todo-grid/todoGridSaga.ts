import { all, call, put, takeLatest } from 'redux-saga/effects';
import { TodoService } from '../../api/services/todoService';
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  deleteTodoSuccess,
  deleteTodoFailure,
  deleteTodoRequest,
  updatedTodoSuccess,
  updatedTodoFailure,
  updatedTodoRequest,
} from './todoGridSlice';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../../models/TodoModel';

function* handleFetchTodos(): Generator<any, void, any> {
  try {
    const todos = yield call(TodoService.getAll);
    yield put(fetchTodosSuccess(todos));
  } catch (error: any) {
    yield put(fetchTodosFailure(error.message));
  }
}

function* handleDeleteTodo(action: ReturnType<typeof deleteTodoRequest>): Generator<any, void, any> {
  try {
    const id = action.payload;
    yield call(TodoService.delete, id);
    yield put(deleteTodoSuccess(id));
  } catch (error: any) {
    yield put(deleteTodoFailure(error.message));
  }
}

function* handleUpdateTodo(action: PayloadAction<Todo>): Generator<any, void, any> {
  try {
    const updatedTodo = yield call(TodoService.update, action.payload);
    yield put(updatedTodoSuccess(updatedTodo));
  } catch (error: any) {
    yield put(updatedTodoFailure(error.message));
  }
}

export function* todoGridSaga() {
  yield all([
    takeLatest(fetchTodosRequest.type, handleFetchTodos),
    takeLatest(deleteTodoRequest.type, handleDeleteTodo),
    takeLatest(updatedTodoRequest.type, handleUpdateTodo),
  ]);
}