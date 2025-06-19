package com.prod.todo.entity;

import com.prod.todo.enums.TodoStatus;
import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Document(collection = "todo_tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TaskEntity {

    @Id
    private String id;
    private String title;
    private String description;
    @Field("status")
    @Builder.Default
    private TodoStatus status = TodoStatus.PENDING;
    private boolean isCompleted;
    @CreatedDate
    private Instant createdAt;
    @CreatedBy
    private String createdBy;
    @LastModifiedDate
    private Instant updatedAt;
    @LastModifiedBy
    private String updatedBy;
    @Field("version")
    @Version
    private Long version;
}
