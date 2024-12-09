package org.studysystem.backend.service;

import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.dto.response.*;

import java.util.List;

public interface EnrollmentService {

    void enrollUserInCourse(Long userId, Long courseId, String classCode);

    LearnBecomesResponse getCourseEnrollment(Long courseId, Long userId);

    List<LearnBecomesResponse> getAllEnrollmentsByUserId(Long userId);

    List<UserResponse> getAllUsersInCourse(Long courseId);

    List<CourseInfoResponse> getAllCoursesOfUser(Long userId);

    List<AbsentResponse> getAbsencesForUserInCourse(Long courseId);

    void removeUserFromCourse(Long userId, Long courseId);

    List<UserAttendanceResponse> getAllUsersAndAttendanceInCourse(Long courseId);

    List<String> importStudents(MultipartFile file, Long courseId);
}
