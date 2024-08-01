package org.studysystem.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateScoresRequest {
    private Double progressScore;
    private Double finalScore;
}
