package org.studysystem.backend.dto.response;

import lombok.Data;

@Data
public class AbsentResponse {
    private Long userId;
    private int unexcusedAbsenceCount;
    private int excusedAbsenceCount;
}
