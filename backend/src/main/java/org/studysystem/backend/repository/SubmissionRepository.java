package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.studysystem.backend.entity.Submission;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByAssignmentId(Long assignmentId);

    List<Submission> findByUserIdAndCourseId(Long userId, Long courseId);

    @Query("SELECT COUNT(s) FROM Submission s WHERE s.assignment.id = :assignmentId")
    int countTotalSubmissionsByAssignmentId(@Param("assignmentId") Long assignmentId);

    boolean existsByAssignmentIdAndUserId(Long assignmentId, Long userId);

    Submission findByAssignmentIdAndUserId(Long assignmentId, Long userId);
}
