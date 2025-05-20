package com.prod.todo.advice;

import com.prod.todo.exception.ApplicationException;
import com.prod.todo.exception.ErrorResponse;
import com.prod.todo.exception.RequestValidationException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Objects;

/**
 * Global exception handler for all controllers.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {


    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ErrorResponse> handleApplicationRuntimeException(ApplicationException ex) {
        log.error("ApplicationException occurred: {}", ex.getMessage(), ex);
        return buildErrorResponse(
                "Application error",
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        log.error("Unhandled exception occurred: {}", ex.getMessage(), ex);
        return buildErrorResponse(
                "Internal server error",
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(RequestValidationException.class)
    public ResponseEntity<ErrorResponse> handleRequestValidationException(RequestValidationException ex) {
        log.warn("Request validation failed: {}", ex.getMessage());
        return buildErrorResponse(
                "Validation failed",
                ex.getMessage(),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        String detail = Objects.requireNonNull(ex.getBindingResult().getFieldError()).getDefaultMessage();
        log.warn("Method argument not valid: {}", detail);
        return buildErrorResponse(
                "Invalid request body",
                detail,
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(ConstraintViolationException ex) {
        log.warn("Constraint violation: {}", ex.getMessage());
        return buildErrorResponse(
                "Invalid request parameters",
                ex.getMessage(),
                HttpStatus.BAD_REQUEST
        );
    }


    private ResponseEntity<ErrorResponse> buildErrorResponse(String message, String detailMessage, HttpStatus status) {
        ErrorResponse error = ErrorResponse.builder()
                .isSuccess(false)
                .message(message)
                .detailMessage(detailMessage)
                .httpStatus(status.name())
                .httpCode(status.value())
                .build();

        return new ResponseEntity<>(error, status);
    }
}
