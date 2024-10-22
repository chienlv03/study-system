package org.studysystem.backend.controller;

import  lombok.RequiredArgsConstructor;
import org.studysystem.backend.dto.request.UpdateScoresRequest;
import org.studysystem.backend.dto.response.*;
import org.studysystem.backend.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/enroll/user/{userId}/course/{courseId}")
    public ResponseEntity<MessageResponse> enrollUserInCourse(@PathVariable Long userId, @PathVariable(required = false) Long courseId, @RequestParam(required = false) String classCode){
        enrollmentService.enrollUserInCourse(userId, courseId, classCode);
        return ResponseEntity.ok(new MessageResponse("Đã thêm học sinh vào lớp"));
    }

    @PutMapping("/update/{enrollmentId}/scores")
    public ResponseEntity<LearnBecomesResponse> updateScores(@PathVariable Long enrollmentId,
                                                             @RequestBody UpdateScoresRequest request) {
        LearnBecomesResponse response = enrollmentService.updateScores(enrollmentId, request);
        return ResponseEntity.ok(response);
    }

    // lấy thông tin của 1 courseEnrollment
    @GetMapping("/get/courseEnrollment/course/{courseId}/user/{userId}")
    public ResponseEntity<LearnBecomesResponse> getCourseEnrollment(@PathVariable Long courseId, @PathVariable Long userId) {
        LearnBecomesResponse response = enrollmentService.getCourseEnrollment(userId, courseId);
        return ResponseEntity.ok(response);
    }

    // lấy thông tin của tất cả khóa học mà 1 user đã tham gia
    @GetMapping("/get/courseEnrollments/user/{userId}")
    public ResponseEntity<List<LearnBecomesResponse>> getAllCourseEnrollmentsByUserId(@PathVariable Long userId) {
        List<LearnBecomesResponse> responses = enrollmentService.getAllCourseEnrollmentsByUserId(userId);
        return ResponseEntity.ok(responses);
    }

    // lấy tất cả user trong 1 khóa học
    @GetMapping("/get/user/in/course/{courseId}")
    public ResponseEntity<List<UserResponse>> getAllUsersInCourse(@PathVariable Long courseId) {
        List<UserResponse> users = enrollmentService.getAllUsersInCourse(courseId);
        return ResponseEntity.ok(users);
    }

    // lấy thông tin của tất cả các khóa học mà 1 user đã tham gia
    @GetMapping("/get/course/of/user/{userId}")
    public ResponseEntity<List<CourseInfoResponse>> getAllCoursesOfUser(@PathVariable Long userId) {
        List<CourseInfoResponse> responses = enrollmentService.getAllCoursesOfUser(userId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/get/absent/in/course/{courseId}")
    public ResponseEntity<List<AbsentResponse>> getAbsencesForUserInCourse(@PathVariable Long courseId) {
        List<AbsentResponse> response = enrollmentService.getAbsencesForUserInCourse(courseId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/remove/user/{userId}/course/{courseId}")
    public ResponseEntity<MessageResponse> removeUserFromCourse(@PathVariable Long userId, @PathVariable Long courseId) {
        enrollmentService.removeUserFromCourse(userId, courseId);
        return ResponseEntity.ok(new MessageResponse("Đã xóa sinh viên khỏi lớp"));
    }

    @GetMapping("get/user/attendance/in/course/{courseId}")
    public ResponseEntity<List<UserAttendanceResponse>> getUserAndAttendanceInCourse(@PathVariable Long courseId) {
        List<UserAttendanceResponse> userAttendanceResponses = enrollmentService.getAllUsersAndAttendanceInCourse(courseId);
        return ResponseEntity.ok(userAttendanceResponses);
    }

    @GetMapping("/get/grade/in/course/{courseId}")
    public ResponseEntity<List<GradeResponse>> getGradesInCourse(@PathVariable Long courseId) {
        List<GradeResponse> gradeResponses = enrollmentService.getGradesForCourse(courseId);
        return ResponseEntity.ok(gradeResponses);
    }
}
