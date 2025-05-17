// models/Todo.ts

export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export const TodoStatusValues: TodoStatus[] = [
  'PENDING',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
];

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  isCompleted: boolean;
  version: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  localeCreatedAt: string;
  localeUpdatedAt: string;
  tasks: Task[];
}
