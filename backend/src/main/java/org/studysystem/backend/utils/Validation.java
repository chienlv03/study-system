package org.studysystem.backend.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.studysystem.backend.exception.BadRequestException;
import org.studysystem.backend.repository.EnrollmentRepository;
import org.studysystem.backend.repository.CourseRepository;

@Component
@RequiredArgsConstructor
public class Validation {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public void existCourseCode(String code) {
        if (courseRepository.existsByClassCode(code)) {
            throw new BadRequestException(MessageConstants.COURSE_CODE_ALREADY_EXISTS);
        }
    }

    public void existUserInCourse(Long userId, Long courseId) {
        if (enrollmentRepository.existsByUserIdAndCourseId(userId, courseId)) {
            throw new BadRequestException(MessageConstants.USER_ALREADY_ENROLLED);
        }
    }


}
