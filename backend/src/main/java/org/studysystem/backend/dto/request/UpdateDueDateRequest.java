package org.studysystem.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateDueDateRequest {
    @NotNull(message = "Hạn nộp không được để trống.")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime dueDate;
}
