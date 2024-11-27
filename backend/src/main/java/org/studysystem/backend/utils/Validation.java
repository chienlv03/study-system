package org.studysystem.backend.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.studysystem.backend.exception.BadRequestException;
import org.studysystem.backend.repository.EnrollmentRepository;
import org.studysystem.backend.repository.CourseRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Component
@RequiredArgsConstructor
public class Validation {

    private final EnrollmentRepository enrollmentRepository;

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    public void existUserInCourse(Long userId, Long courseId) {
        if (enrollmentRepository.existsByUserIdAndCourseId(userId, courseId)) {
            throw new BadRequestException(MessageConstants.USER_ALREADY_ENROLLED);
        }
    }

    public void validateCourseTime(LocalTime startTime, LocalTime endTime) {
        if (startTime == null || endTime == null) {
            throw new IllegalArgumentException("Start time and end time cannot be null.");
        }
        if (startTime.isAfter(endTime) || startTime.equals(endTime)) {
            throw new IllegalArgumentException("Start time must be before end time.");
        }
    }

}
