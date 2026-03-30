//package com.cww.invoice.common.controller;
//
//
//import com.cww.invoice.common.entity.ApiError;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//import java.time.LocalDateTime;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(RuntimeException.class)
//    public ResponseEntity<ApiError> handleRuntimeException(RuntimeException ex) {
//
//        ApiError error = new ApiError(
//                LocalDateTime.now(),
//                HttpStatus.BAD_REQUEST.value(),
//                ex.getMessage()
//        );
//
//        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
//    }
//}