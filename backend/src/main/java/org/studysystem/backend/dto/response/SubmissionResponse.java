package org.studysystem.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmissionResponse {
    private Long id;
    private String content;
    private String submittedDate;
    private Double grade;
    private String feedback;
    private boolean isLate;
    private String username;
}
