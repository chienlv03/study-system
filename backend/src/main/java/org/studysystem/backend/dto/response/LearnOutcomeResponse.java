package org.studysystem.backend.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class LearnOutcomeResponse {
    private String courseName;
    private String classCode;
    private String username;
    private Double progressScore;
    private Double finalScore;
    private Double courseScore;
    private int excusedAbsenceCount;
}
