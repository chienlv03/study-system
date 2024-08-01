package org.studysystem.backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LearnBecomesResponse {
    private String classCode;
    private String name;
    private int unexcusedAbsenceCount;
    private int excusedAbsenceCount;
    private Double progressScore;
    private Double finalScore;
    private Double courseScore;
}
