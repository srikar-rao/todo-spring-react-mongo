package com.prod.todo.entity;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Document(collection = "todo_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoLogEntity {

    @Id
    private String id;
    @Field("todo_id")
    private String todoId;
    @Field("snapshot")
    private JsonNode snapshot;
    @CreatedDate
    private Instant createdAt;
    @CreatedBy
    private String createdBy;
}
