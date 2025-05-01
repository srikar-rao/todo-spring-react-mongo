package com.prod.todo.model;

import com.prod.todo.enums.TodoStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Todo {

    private Long id;

    private String title;

    private String description;

    private TodoStatus status;

    private boolean isCompleted;

    private Long version;

    private Instant createdAt;

    private String createdBy;

    private Instant updatedAt;

    private String updatedBy;
}
