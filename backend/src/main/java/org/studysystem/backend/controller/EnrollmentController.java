package org.studysystem.backend.controller;

import  lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
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

    // lấy thông tin của 1 courseEnrollment
    @GetMapping("/get/enrollment/course/{courseId}/user/{userId}")
    public ResponseEntity<LearnBecomesResponse> getCourseEnrollment(@PathVariable Long courseId, @PathVariable Long userId) {
        LearnBecomesResponse response = enrollmentService.getCourseEnrollment(userId, courseId);
        return ResponseEntity.ok(response);
    }

    // lấy thông tin của tất cả khóa học mà 1 user đã tham gia
    @GetMapping("/get/enrollments/user/{userId}")
    public ResponseEntity<List<LearnBecomesResponse>> getAllCourseEnrollmentsByUserId(@PathVariable Long userId) {
        List<LearnBecomesResponse> responses = enrollmentService.getAllEnrollmentsByUserId(userId);
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

    @PostMapping("/import/course/{courseId}")
    public ResponseEntity<?> importStudents(@RequestParam("file") MultipartFile file,
                                            @PathVariable Long courseId) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty.");
        }

        List<String> errors = enrollmentService.importStudents(file, courseId);

        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok("Students imported successfully into course with ID " + courseId);
    }

    @GetMapping("/learning-outcomes/user/{userId}")
    public ResponseEntity<List<LearnOutcomeResponse>> getLearningOutcomes(@PathVariable Long userId) {
        List<LearnOutcomeResponse> outcomes = enrollmentService.getLearningOutcomesByUserId(userId);
        return ResponseEntity.ok(outcomes);
    }
}
