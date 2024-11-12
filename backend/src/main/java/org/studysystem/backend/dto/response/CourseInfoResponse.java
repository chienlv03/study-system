package org.studysystem.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseInfoResponse {
    private Long id;
    private String name;
    private String classCode;
    private String startTime;
    private String endTime;
    private int maxStudents;
    private int currentStudents;
    private Long userId;
}
