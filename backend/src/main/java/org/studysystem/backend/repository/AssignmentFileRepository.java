package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.studysystem.backend.entity.Assignment;
import org.studysystem.backend.entity.AssignmentFile;

import java.util.List;
import java.util.Optional;

public interface AssignmentFileRepository extends JpaRepository<AssignmentFile, Long> {

    List<AssignmentFile> findByAssignmentId(Long assignmentId);

    void deleteByAssignmentId(Long assignmentId);
}
