package com.prod.todo.service;


import com.prod.todo.model.ResponseStatus;
import com.prod.todo.model.Todo;

import java.util.List;

public interface TodoService {

    List<Todo> getAllTodos();

    Todo getTodoById(Long id);

    Todo saveTodo(Todo todo);

    ResponseStatus deleteTodo(Long id);

}
