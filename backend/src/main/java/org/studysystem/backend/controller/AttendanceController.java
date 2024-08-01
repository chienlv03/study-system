package org.studysystem.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studysystem.backend.dto.request.CreateAttendanceRequest;
import org.studysystem.backend.dto.request.UpdateAttendanceRequest;
import org.studysystem.backend.dto.response.AttendanceResponse;
import org.studysystem.backend.service.AttendanceService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/create/course/{courseId}")
    public ResponseEntity<List<AttendanceResponse>> createAttendanceRecords(@PathVariable Long courseId,
                                                                            @RequestBody CreateAttendanceRequest request) {
        List<AttendanceResponse> attendances = attendanceService.createAttendanceRecords(courseId, request);
        return ResponseEntity.ok(attendances);
    }


    @PutMapping("/update/user/{userId}/course/{courseId}")
    public ResponseEntity<AttendanceResponse> updateAttendanceStatus(@PathVariable Long userId,
                                                             @PathVariable Long courseId,
                                                             @RequestBody UpdateAttendanceRequest updateAttendanceRequest) {
        AttendanceResponse attendance = attendanceService.updateAttendanceStatus(
                userId,
                courseId,
                updateAttendanceRequest
        );
        return ResponseEntity.ok(attendance);
    }

    @GetMapping("/course/{courseId}/times")
    public ResponseEntity<List<String>> getDistinctAttendanceTimesByClassroomId(@PathVariable Long courseId) {
        List<String> attendanceTimes = attendanceService.getDistinctAttendanceTimesByCourseId(courseId);
        return ResponseEntity.ok(attendanceTimes);
    }


}
