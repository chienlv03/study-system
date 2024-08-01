package org.studysystem.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.studysystem.backend.entity.enums.AttendanceStatus;

@Data
@Builder
@AllArgsConstructor
public class AttendanceRequest {
    private String attendanceTime;
    private AttendanceStatus status;
}
