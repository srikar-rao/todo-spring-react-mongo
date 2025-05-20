package com.prod.todo.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class ErrorResponse {


    private final boolean isSuccess;

    private final String message;

    private final String detailMessage;

    private final String httpStatus;

    private final int httpCode;
}
