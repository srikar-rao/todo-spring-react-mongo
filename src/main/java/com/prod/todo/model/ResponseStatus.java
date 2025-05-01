package com.prod.todo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseStatus {
    private boolean isSuccess;
    private String message;
    private String detailMessage;
}
