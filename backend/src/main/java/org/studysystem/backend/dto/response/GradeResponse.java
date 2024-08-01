package org.studysystem.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GradeResponse {
    private Long enrollmentId;
    private Long userId;
    private String code;
    private String username;
    private Double progressScore;
    private Double finalScore;
    private Double courseScore;

}
