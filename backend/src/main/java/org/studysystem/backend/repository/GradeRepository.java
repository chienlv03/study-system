package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.Grade;
import org.studysystem.backend.entity.User;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findByUser(User user);

    List<Grade> findByCourse(Course course);

    boolean existsByUserIdAndCourseId(Long userId, Long courseId);
}
