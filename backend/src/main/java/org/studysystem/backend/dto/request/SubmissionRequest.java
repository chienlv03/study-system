package org.studysystem.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmissionRequest {
    private String content;

    private String submittedDate;

    private Long assignmentId;

    private Long userId;

    private Long courseId;
}
