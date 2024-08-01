package org.studysystem.backend.dto.response;

import lombok.Builder;
import lombok.Data;
import org.studysystem.backend.dto.request.AttendanceRequest;

import java.util.List;

@Data
@Builder
public class UserAttendanceResponse {
    private Long id;
    private String code;
    private String username;
    private String email;
    private String dob;
    private String gender;
    List<AttendanceRequest> attendanceRecords;
}
