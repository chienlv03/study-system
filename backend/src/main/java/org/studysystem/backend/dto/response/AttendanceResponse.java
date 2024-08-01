package org.studysystem.backend.dto.response;

import lombok.Builder;
import lombok.Data;
import org.studysystem.backend.entity.enums.AttendanceStatus;

@Data
@Builder
public class AttendanceResponse {
    private String attendanceTime;
    private AttendanceStatus status;
    private Long userId;
    private Long courseId;
    private int unexcusedAbsenceCount;
    private int excusedAbsenceCount;
}
