package com.prod.todo.service;


import com.prod.todo.model.ResponseStatus;
import com.prod.todo.model.Todo;

import java.util.List;

public interface TodoService {

    List<Todo> getAllTodos();

    Todo getTodoById(String id);

    Todo saveTodo(String userId, Todo todo);

    ResponseStatus deleteTodo(String id);

    Todo update(Todo todo);
}
