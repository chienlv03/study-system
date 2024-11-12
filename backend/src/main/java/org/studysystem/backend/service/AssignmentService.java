package org.studysystem.backend.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.dto.request.AssignmentRequest;
import org.studysystem.backend.dto.response.AssignmentResponse;

import java.util.List;

public interface AssignmentService {
    @Transactional
    void createAssignment(AssignmentRequest assignmentRequest, MultipartFile[] files);

    @Transactional
    void updateAssignment(Long assignmentId, AssignmentRequest updatedAssignmentRequest, MultipartFile[] files);

    List<AssignmentResponse> getAssignmentsByCourseId(Long courseId);

    @Transactional
    void deleteAssignment(Long assignmentId);
}
