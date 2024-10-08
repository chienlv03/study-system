package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.studysystem.backend.entity.Assignments;

public interface AssignmentRepository extends JpaRepository<Assignments, Long> {
}
