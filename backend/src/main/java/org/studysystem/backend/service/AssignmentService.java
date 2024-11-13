package org.studysystem.backend.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.dto.request.AssignmentRequest;
import org.studysystem.backend.dto.response.AssignmentResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface AssignmentService {
    @Transactional
    void createAssignment(AssignmentRequest assignmentRequest, MultipartFile[] files);

    @Transactional
    void updateDueDate(Long assignmentId, LocalDateTime dueDate);

    List<AssignmentResponse> getAssignmentsByCourseId(Long courseId);

    @Transactional
    void deleteAssignment(Long assignmentId);
}
