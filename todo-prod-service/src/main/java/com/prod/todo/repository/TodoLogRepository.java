package com.prod.todo.repository;

import com.prod.todo.entity.TodoLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoLogRepository extends JpaRepository<TodoLogEntity, Long> {
}
