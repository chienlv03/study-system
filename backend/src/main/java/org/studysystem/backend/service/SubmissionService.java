package org.studysystem.backend.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.dto.request.SubmissionRequest;
import org.studysystem.backend.dto.request.UpdateGradeAndFeedbackRequest;
import org.studysystem.backend.dto.response.AssignmentResponse;
import org.studysystem.backend.dto.response.SubmissionResponse;

import java.util.List;

public interface SubmissionService {
    void createSubmission(SubmissionRequest submissionRequest, MultipartFile[] files);

    String checkSubmitted(Long assignmentId, Long userId);

    @Transactional
    void updateSubmission(Long submissionId, SubmissionRequest updatedSubmissionRequest, MultipartFile[] files);

    void updateGradeAndFeedback(Long submissionId, UpdateGradeAndFeedbackRequest request);

    List<SubmissionResponse> getSubmissionByAssignmentId(Long assignmentId);

    List<SubmissionResponse> getSubmissionByUserIdAndCourseId(Long userId, Long courseId);

    @Transactional
    void deleteSubmission(Long submissionId, Long assignmentId);
}
