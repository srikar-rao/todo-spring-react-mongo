import type { Todo } from "../../models/TodoModel";
import axiosTodo from "../instances/axiosTodo";

export const TodoService = {
    getAll: async (): Promise<Todo[]> => {
        const res = await axiosTodo.get('/todo/all');
        return res.data;
      },
}