package com.prod.todo.service.impl;

import com.prod.todo.entity.TodoEntity;
import com.prod.todo.model.ResponseStatus;
import com.prod.todo.model.Todo;
import com.prod.todo.repository.TodoRepository;
import com.prod.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final ModelMapper modelMapper;
    private final PlatformTransactionManager transactionManager;

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll()
                .stream()
                .map(todoEntity -> modelMapper.map(todoEntity, Todo.class))
                .toList();
    }

    @Override
    public Todo getTodoById(Long id) {
        TodoEntity todoEntity = todoRepository.findById(id).orElse(new TodoEntity());
        return modelMapper.map(todoEntity, Todo.class);
    }

    //POSTGRES - defaults (READ_COMMITTED and REQUIRED)
    @Override
    @Transactional(
            isolation = Isolation.SERIALIZABLE,
            propagation = Propagation.REQUIRES_NEW,
            timeout = 10000
    )
    public Todo saveTodo(Todo todo) {
        TodoEntity newTodo = todoRepository.save(
                TodoEntity
                        .builder()
                        .title(todo.getTitle())
                        .description(todo.getDescription())
                        .build()
        );
        log.info("Successfully saved todo : {}", newTodo);
        return modelMapper.map(newTodo, Todo.class);
    }

    @Override
    public ResponseStatus deleteTodo(Long id) {

        TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);

        transactionTemplate.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
        transactionTemplate.setIsolationLevel(TransactionDefinition.ISOLATION_SERIALIZABLE);
        transactionTemplate.setName("deleteTodoTransaction");

        return transactionTemplate.execute(status -> {
            try {
                todoRepository.deleteById(id);
                return ResponseStatus.builder()
                        .isSuccess(Boolean.TRUE)
                        .message("Successfully deleted todo of id " + id)
                        .build();
            } catch (Exception ex) {
                status.setRollbackOnly();
                throw ex;
            }
        });
    }

}
