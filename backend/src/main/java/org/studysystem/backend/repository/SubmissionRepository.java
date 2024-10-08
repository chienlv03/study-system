package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.studysystem.backend.entity.Submission;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
}
