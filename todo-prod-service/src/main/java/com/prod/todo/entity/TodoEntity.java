package com.prod.todo.entity;

import com.prod.todo.enums.TodoStatus;
import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "todo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TodoEntity {

    @Id
    private String id;
    @Field("user_id")
    private String userId;
    private String title;
    private String description;
    @Field("target_date")
    private LocalDate targetDate;
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
    private List<TaskEntity> tasks = new ArrayList<>();
    @Field("version")
    @Version
    private Long version;
}
