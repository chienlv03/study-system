package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.studysystem.backend.entity.Course;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {
    boolean existsByClassCode(String classCode);

    List<Course> findAllByUserId(Long userId);

    Optional<Course> findByClassCode(String classCode);
}
