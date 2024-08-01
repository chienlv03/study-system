package org.studysystem.backend.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseRequest {
    private String name;
    private String classCode;
    private String startTime;
}
