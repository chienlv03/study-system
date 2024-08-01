package org.studysystem.backend.service;

import org.studysystem.backend.dto.request.CreateAttendanceRequest;
import org.studysystem.backend.dto.request.UpdateAttendanceRequest;
import org.studysystem.backend.dto.response.AttendanceResponse;
import org.studysystem.backend.dto.response.UserAttendanceResponse;
import org.studysystem.backend.entity.Attendance;

import java.util.List;

public interface AttendanceService {

    List<AttendanceResponse> createAttendanceRecords(Long courseId, CreateAttendanceRequest request);

    AttendanceResponse updateAttendanceStatus(Long userId, Long courseId, UpdateAttendanceRequest request);

    List<String> getDistinctAttendanceTimesByCourseId(Long courseId);
}
