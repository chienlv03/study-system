package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.studysystem.backend.entity.SubmissionFile;

import java.util.List;

public interface SubmissionFileRepository extends JpaRepository<SubmissionFile, Long> {
    List<SubmissionFile> findBySubmissionId(Long submissionId);

    void deleteBySubmissionId(Long submissionId);
}
