package org.studysystem.backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AssignmentResponse {
    private Long id;

    private String title;

    private String content;

    private LocalDateTime dueDate;

    private LocalDateTime assignedDate;

    private boolean point;

    private int totalSubmissions;

    private String courseName;

    private String userName;
}
