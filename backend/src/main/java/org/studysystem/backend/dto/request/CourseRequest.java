package org.studysystem.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
public class CourseRequest {
    private String name;
    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;
    private int maxStudents;
}
