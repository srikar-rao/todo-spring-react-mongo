package com.prod.todo.exception;

import java.io.Serial;

/**
 * Exception thrown when request validation fails.
 */
public class RequestValidationException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public RequestValidationException(String message) {
        super(message);
    }

    public RequestValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
