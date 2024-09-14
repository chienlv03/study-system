package org.studysystem.backend.exception;

import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.studysystem.backend.dto.response.MessageResponse;

// code thừa ở đây để làm gì thế có RestControllerAdvice rồi mà
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<MessageResponse> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }

}
