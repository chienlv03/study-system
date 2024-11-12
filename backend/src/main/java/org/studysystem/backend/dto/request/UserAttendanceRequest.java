package org.studysystem.backend.dto.request;

import lombok.Getter;
import lombok.Setter;
import org.studysystem.backend.dto.response.AttendanceResponse;

import java.util.List;

@Getter
@Setter
public class UserAttendanceRequest {
    private Long id;
    private String username;
    private String email;
    private String dob;
    private String gender;
    List<AttendanceResponse> attendanceRecords;
}
