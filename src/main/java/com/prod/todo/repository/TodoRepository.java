package com.prod.todo.repository;

import com.prod.todo.entity.TodoEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, Long> {

    @Query("SELECT t FROM TodoEntity t LEFT JOIN FETCH t.tasks")
    List<TodoEntity> findAllWithTasks();

    @EntityGraph(attributePaths = {"tasks"})
    @Query("SELECT t FROM TodoEntity t")
    List<TodoEntity> findAllWithTasksUsingGraph();

}
