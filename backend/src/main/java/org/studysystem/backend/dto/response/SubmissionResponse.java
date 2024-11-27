package org.studysystem.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SubmissionResponse {
    private Long id;
    private String content;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime submittedDate;
    private Double grade;
    private String feedback;
    private boolean isLate;
    private boolean point;
    private String title;
    private String username;
    private Long assignmentId;
}
