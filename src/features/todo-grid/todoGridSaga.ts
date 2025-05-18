import { call, put, takeLatest } from 'redux-saga/effects';
import { TodoService } from '../../api/services/todoService';
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
} from './todoGridSlice';

function* handleFetchTodos(): Generator<any, void, any> {
  try {
    const todos = yield call(TodoService.getAll);
    yield put(fetchTodosSuccess(todos));
  } catch (error: any) {
    yield put(fetchTodosFailure(error.message));
  }
}

export function* todoGridSaga() {
  yield takeLatest(fetchTodosRequest.type, handleFetchTodos);
}
