package org.studysystem.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime dueDate;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime assignedDate;

    private boolean point;

    private int totalSubmissions;

    private String courseName;

    private String userName;
}
