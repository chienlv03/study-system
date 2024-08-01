package org.studysystem.backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAttendanceRequest {
    private String attendanceTime;
    private Boolean isAbsent;
    private Boolean isExcused;
}
