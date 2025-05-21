package com.prod.todo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.prod.todo.enums.TodoStatus;
import lombok.*;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Todo {

    private Long id;

    private String userId;

    private String title;

    private String description;

    private LocalDate targetDate;

    private TodoStatus status;

    @JsonProperty("isCompleted")
    private boolean isCompleted;

    private Long version;

    private Instant createdAt;

    private String createdBy;

    private Instant updatedAt;

    private String updatedBy;

    private String localeCreatedAt;

    private String localeUpdatedAt;

    private List<Task> tasks;
}
