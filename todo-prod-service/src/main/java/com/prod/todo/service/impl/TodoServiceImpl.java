package com.prod.todo.service.impl;

import com.prod.todo.entity.TodoEntity;
import com.prod.todo.entity.TodoLogEntity;
import com.prod.todo.mapper.TodoMapper;
import com.prod.todo.model.ResponseStatus;
import com.prod.todo.model.Todo;
import com.prod.todo.repository.TodoLogRepository;
import com.prod.todo.repository.TodoRepository;
import com.prod.todo.service.TodoService;
import com.prod.todo.util.JsonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final TodoLogRepository todoLogRepository;
    private final ModelMapper modelMapper;
    private final TodoMapper todoMapper;

    @Override
    public List<Todo> getAllTodos() {
        return todoMapper.toModelListWithLocale(todoRepository.findAll());
    }

    @Override
    public Todo getTodoById(String id) {
        TodoEntity todoEntity = todoRepository.findById(id).orElse(new TodoEntity());
        return modelMapper.map(todoEntity, Todo.class);
    }

    @Override
    public Todo saveTodo(String userId, Todo todo) {
        TodoEntity newEntity = todoMapper.toNewEntity(todo);
        newEntity.setUserId(userId);
        TodoEntity savedTodo = todoRepository.save(newEntity);
        todoLogRepository.save(
                TodoLogEntity
                        .builder()
                        .todoId(savedTodo.getId())
                        .snapshot(JsonUtil.toJsonNode(savedTodo))
                        .build()
        );
        log.info("Successfully saved todo : {}", savedTodo);
        return todoMapper.toModelWithLocale(savedTodo);
    }

    @Override
    public ResponseStatus deleteTodo(String id) {
        try {
            todoRepository.deleteById(id);
            return ResponseStatus.builder()
                    .isSuccess(Boolean.TRUE)
                    .message("Successfully deleted todo of id " + id)
                    .build();
        } catch (Exception ex) {
            throw ex;
        }
    }

    @Override
    public Todo update(Todo todo) {
        Optional<TodoEntity> optEntity = todoRepository.findById(todo.getId());
        if(optEntity.isPresent()){
            TodoEntity todoEntity = optEntity.get();
            todoEntity.setTitle(todo.getTitle());
            todoEntity.setDescription(todo.getDescription());
            todoEntity.setStatus(todo.getStatus());
            todoEntity.setCompleted(todo.isCompleted());
            TodoEntity saved = todoRepository.save(todoEntity);
            return todoMapper.toModelWithLocale(saved);
        }else return new Todo();
    }
}
