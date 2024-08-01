package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.studysystem.backend.entity.CourseEnrollment;

import java.util.List;
import java.util.Optional;

public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollment, Long> {
    Optional<CourseEnrollment> findByUserIdAndCourseId(Long userId, Long courseId);

    List<CourseEnrollment> findByCourseId(Long courseId);

    List<CourseEnrollment> findByUserId(Long userId);

    boolean existsByUserIdAndCourseId(Long userId, Long courseId);
}
