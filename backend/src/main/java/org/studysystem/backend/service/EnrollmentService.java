package org.studysystem.backend.service;

import org.studysystem.backend.dto.request.UpdateScoresRequest;
import org.studysystem.backend.dto.response.*;

import java.util.List;

public interface EnrollmentService {

    void enrollUserInCourse(Long userId, Long courseId, String classCode);

    LearnBecomesResponse updateScores(Long enrollmentId, UpdateScoresRequest request);

    LearnBecomesResponse getCourseEnrollment(Long courseId, Long userId);

    List<LearnBecomesResponse> getAllEnrollmentsByUserId(Long userId);

    List<UserResponse> getAllUsersInCourse(Long courseId);

    List<CourseInfoResponse> getAllCoursesOfUser(Long userId);

    List<AbsentResponse> getAbsencesForUserInCourse(Long courseId);

    void removeUserFromCourse(Long userId, Long courseId);

    List<UserAttendanceResponse> getAllUsersAndAttendanceInCourse(Long courseId);

    List<GradeResponse> getGradesForCourse(Long courseId);
}
