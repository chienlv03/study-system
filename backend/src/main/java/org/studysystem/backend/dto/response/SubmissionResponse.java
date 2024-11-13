package org.studysystem.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SubmissionResponse {
    private Long id;
    private String content;
    private LocalDateTime submittedDate;
    private Double grade;
    private String feedback;
    private boolean isLate;
    private boolean point;
    private String title;
    private String username;
}
