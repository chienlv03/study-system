package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.Enrollment;
import org.studysystem.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Optional<Enrollment> findByUserIdAndCourseId(Long userId, Long courseId);

    List<Enrollment> findByCourseId(Long courseId);

    List<Enrollment> findByUserId(Long userId);

    int countByCourseId(Long courseId);

    boolean existsByUserIdAndCourseId(Long userId, Long courseId);

    boolean existsByUserAndCourse(User user, Course course);
}
