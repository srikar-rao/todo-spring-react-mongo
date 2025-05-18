import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import todoGridReducer from '../features/todo-grid/todoGridSlice';
import { todoGridSaga } from '../features/todo-grid/todoGridSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    todoGridSaga(),
  ]);
}

export const store = configureStore({
  reducer: {
    todoGrid: todoGridReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

