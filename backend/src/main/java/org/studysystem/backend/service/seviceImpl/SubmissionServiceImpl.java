package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.entity.Assignments;
import org.studysystem.backend.entity.Submission;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.exception.ResourceNotFoundException;
import org.studysystem.backend.repository.AssignmentRepository;
import org.studysystem.backend.repository.SubmissionRepository;
import org.studysystem.backend.service.FileStorageService;
import org.studysystem.backend.service.SubmissionService;
import org.studysystem.backend.utils.FindEntity;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final FileStorageService fileStorageService;
    private final FindEntity findEntity;

    @Override
    public void submitAssignment(Long assignmentId, Long userId, String content, MultipartFile file, MultipartFile image) throws IOException {
        Assignments assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));
        User user = findEntity.findUser(userId);

        Submission submission = new Submission();
        submission.setAssignment(assignment);
        submission.setUser(user);
        submission.setContent(content);
        submission.setSubmissionDate(LocalDateTime.now());

        // Lưu file
        if (file != null && !file.isEmpty()) {
            String fileUrl = fileStorageService.storeFile(file);
            submission.setFileUrl(fileUrl);
        }

        // Lưu hình ảnh
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image);
            submission.setImageUrl(imageUrl);
        }

        // Lưu bài nộp vào database
        submissionRepository.save(submission);
    }

    @Override
    public void gradeSubmission(Long submissionId, Integer grade, String feedback) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Submission not found"));

        submission.setGrade(grade);
        submission.setFeedback(feedback);
        submission.setGraded(true);

        // Lưu lại bài nộp sau khi chấm điểm
        submissionRepository.save(submission);
    }
}
