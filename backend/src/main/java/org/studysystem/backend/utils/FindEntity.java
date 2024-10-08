package org.studysystem.backend.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.studysystem.backend.entity.*;
import org.studysystem.backend.exception.ResourceNotFoundException;
import org.studysystem.backend.repository.*;

@Component
@RequiredArgsConstructor
public class FindEntity {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AttendanceRepository attendanceRepository;
    private final AssignmentRepository assignmentRepository;

    public User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(MessageConstants.USER_NOT_FOUND));
    }

    public Course findCourse(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(MessageConstants.COURSE_NOT_FOUND));
    }

    public Assignments findAssignment(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(MessageConstants.ASSIGNMENT_NOT_FOUND));
    }

    public Course findCourseByClassCode(String classCode) {
        return courseRepository.findByClassCode(classCode)
                .orElseThrow(() -> new ResourceNotFoundException(MessageConstants.COURSE_CODE_NOT_FOUND));
    }

    public Enrollment findByUserIdAndCourseId(Long userId, Long courseId) {
        return  enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));
    }

    public Enrollment findCourseEnrollment(Long id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(MessageConstants.COURSE_ENROLLMENT_NOT_FOUND));
    }

    public Attendance findByCourseEnrollmentAndAttendanceTime(Enrollment enrollment, String attendanceTime) {
        return attendanceRepository.findByEnrollmentAndAttendanceTime(enrollment, attendanceTime)
                .orElseThrow(() -> new ResourceNotFoundException(MessageConstants.ATTENDANCE_NOT_FOUND));
    }
}
