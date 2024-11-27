package org.studysystem.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalTime;

@Data
@Builder
public class CourseInfoResponse {
    private Long id;
    private String name;
    private String classCode;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;
    private int maxStudents;
    private int currentStudents;
    private Long userId;
}
