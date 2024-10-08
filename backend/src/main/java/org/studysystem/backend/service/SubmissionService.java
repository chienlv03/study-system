package org.studysystem.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SubmissionService {
    void submitAssignment(Long assignmentId, Long userId, String content, MultipartFile file, MultipartFile image) throws IOException;

    void gradeSubmission(Long submissionId, Integer grade, String feedback);
}
