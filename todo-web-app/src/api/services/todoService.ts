import type { Todo } from "../../models/TodoModel";
import axiosTodo from "../instances/axiosTodo";

export const TodoService = {
    getAll: async (): Promise<Todo[]> => {
        const res = await axiosTodo.get('/todo/all');
        return res.data;
      },

      getById: async (id: number): Promise<Todo> => {
        const res = await axiosTodo.get(`/todo/${id}`);
        return res.data;
      },
    
      create: async (todo: Partial<Todo>): Promise<Todo> => {
        const res = await axiosTodo.post('/todo/save', todo);
        return res.data;
      },
    
      update: async (todo: Partial<Todo>): Promise<Todo> => {
        const res = await axiosTodo.put(`/todo/update`, todo);
        return res.data;
      },
    
      delete: async (id: number): Promise<void> => {
        await axiosTodo.delete(`/todo/delete/${id}`);
      },
}