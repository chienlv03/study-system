package org.studysystem.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateGradeAndFeedbackRequest {
    private Double grade;
    private String feedback;
}
