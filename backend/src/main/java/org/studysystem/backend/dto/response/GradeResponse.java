package org.studysystem.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GradeResponse {
    private Long id;
    private Long courseId;
    private Long userId;
    private String username;
    private Double progressScore;
    private Double finalScore;
    private Double courseScore;

}
