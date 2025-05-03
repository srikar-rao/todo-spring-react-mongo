package com.prod.todo.model;

import com.prod.todo.enums.TodoStatus;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@ToString
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

    private String localeCreatedAt;

    private String localeUpdatedAt;
}
