package com.prod.todo.aop;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Slf4j
@Aspect
@Component
public class ControllerLoggingAspect {

    @Around("execution(* com.prod.todo.controller..*(..)) && @within(restController)")
    public Object logRequestLifecycle(ProceedingJoinPoint joinPoint, RestController restController) throws Throwable {
        long start = System.currentTimeMillis();

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String methodName = signature.getDeclaringType().getSimpleName() + "." + signature.getName();

        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (!(requestAttributes instanceof ServletRequestAttributes attributes)) {
            return joinPoint.proceed(); // skip if not HTTP
        }

        HttpServletRequest request = attributes.getRequest();
        HttpServletResponse response = attributes.getResponse();

        String path = request.getRequestURI();
        String params = request.getQueryString();

        log.info("Request received for method = [{}] path = {} params = {}", methodName, path, params);

        Object result = null;
        try {
            result = joinPoint.proceed();
            return result;
        } finally {
            long duration = System.currentTimeMillis() - start;
            int status = response != null ? response.getStatus() : 0;
            log.info("Request processed for method = [{}] path = {} params = {} with status = {} completed in {} ms",
                    methodName,
                    path,
                    params,
                    status,
                    duration
            );
        }
    }
}
