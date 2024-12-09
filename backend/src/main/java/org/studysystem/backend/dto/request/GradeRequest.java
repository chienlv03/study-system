package org.studysystem.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GradeRequest {
    private Double progressScore;
    private Double finalScore;
}
