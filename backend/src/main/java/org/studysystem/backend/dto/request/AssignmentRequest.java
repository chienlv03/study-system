package org.studysystem.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String content;

    @NotBlank(message = "Assigned Date is required")
    private String assignedDate;

    private String dueDate;

    @JsonProperty("point")
    private boolean point;

    @NotNull(message = "Course ID is required")
    private Long courseId;

    @NotNull(message = "User ID is required")
    private Long userId;
}
