package com.prod.todo.repository;

import com.prod.todo.entity.TodoLogEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoLogRepository extends MongoRepository<TodoLogEntity, String> {
}
