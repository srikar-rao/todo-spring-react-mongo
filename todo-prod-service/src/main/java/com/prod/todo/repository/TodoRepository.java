package com.prod.todo.repository;

import com.prod.todo.entity.TodoEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends MongoRepository<TodoEntity, String> {
    List<TodoEntity> findAllByOrderByCreatedAtDesc();
    Optional<TodoEntity> findById(String id);
    // Add more MongoDB query methods as needed
}
