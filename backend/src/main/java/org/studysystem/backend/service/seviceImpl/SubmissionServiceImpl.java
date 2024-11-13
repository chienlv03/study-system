package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.dto.request.SubmissionRequest;
import org.studysystem.backend.dto.request.UpdateGradeAndFeedbackRequest;
import org.studysystem.backend.dto.response.SubmissionResponse;
import org.studysystem.backend.entity.*;
import org.studysystem.backend.mapper.SubmissionMapper;
import org.studysystem.backend.repository.AssignmentRepository;
import org.studysystem.backend.repository.SubmissionFileRepository;
import org.studysystem.backend.repository.SubmissionRepository;
import org.studysystem.backend.service.SubmissionService;
import org.studysystem.backend.utils.FileUtil;
import org.studysystem.backend.utils.FindEntity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final FindEntity findEntity;
    private final SubmissionMapper submissionMapper;
    private final SubmissionRepository submissionRepository;
    private final AssignmentRepository assignmentRepository;
    private final SubmissionFileRepository submissionFileRepository;
    private final FileUtil fileUtil;

    @Transactional
    @Override
    public void createSubmission(SubmissionRequest submissionRequest, MultipartFile[] files) {
        Assignment assignment = findEntity.findAssignment(submissionRequest.getAssignmentId());
        User user = findEntity.findUser(submissionRequest.getUserId());
        Course course = findEntity.findCourse(submissionRequest.getCourseId());

        Submission submission = submissionMapper.toSubmission(submissionRequest);
        submission.setSubmittedDate(LocalDateTime.now());
        submission.setAssignment(assignment);
        submission.setUser(user);
        submission.setCourse(course);

//        LocalDateTime dueDate = LocalDateTime.parse(assignment.getDueDate(), DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"));
//        LocalDateTime submittedDate = LocalDateTime.parse(submissionRequest.getSubmittedDate(), DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"));

        submission.setLate(submission.getSubmittedDate().isAfter(assignment.getDueDate()));

        Submission savedSubmission = submissionRepository.save(submission);
        assignment.setTotalSubmissions(submissionRepository.countTotalSubmissionsByAssignmentId(assignment.getId()));
        assignmentRepository.save(assignment);

        saveFilesForSubmission(files, savedSubmission);
    }

    @Transactional
    @Override
    public void updateSubmission(Long submissionId, SubmissionRequest updatedSubmissionRequest, MultipartFile[] files) {
        Submission existingSubmission = findEntity.findSubmission(submissionId);
        submissionMapper.updateSubmissionFromRequest(updatedSubmissionRequest, existingSubmission);

        // Delete existing files and save new ones if any are uploaded
        if (files != null) {
            submissionFileRepository.deleteBySubmissionId(submissionId);
            saveFilesForSubmission(files, existingSubmission);
        }

        submissionRepository.save(existingSubmission);
    }

    @Override
    public void updateGradeAndFeedback(Long submissionId, UpdateGradeAndFeedbackRequest request) {
        Submission submission = findEntity.findSubmission(submissionId);
        submission.setGrade(request.getGrade());
        submission.setFeedback(request.getFeedback());
        submissionRepository.save(submission);
    }

    @Override
    public List<SubmissionResponse> getSubmissionByAssignmentId(Long assignmentId) {
        List<Submission> submissions = submissionRepository.findByAssignmentId(assignmentId);
        return submissions.stream()
                .map(submissionMapper::toSubmissionResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<SubmissionResponse> getSubmissionByUserIdAndCourseId(Long userId, Long courseId) {
        List<Submission> submissions = submissionRepository.findByUserIdAndCourseId(userId, courseId);
        return submissions.stream()
                .map(submissionMapper::toSubmissionResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteSubmission(Long submissionId, Long assignmentId) {
        Assignment assignment = findEntity.findAssignment(assignmentId);
        Submission submission = findEntity.findSubmission(submissionId);
        submissionFileRepository.deleteBySubmissionId(submissionId); // Deletes associated files
        submissionRepository.delete(submission);
        assignment.setTotalSubmissions(submissionRepository.countTotalSubmissionsByAssignmentId(assignmentId));
        assignmentRepository.save(assignment);
    }

    private void saveFilesForSubmission(MultipartFile[] files, Submission submission) {
        if (files == null) return;

        for (MultipartFile file : files) {
            String filePath = fileUtil.saveFile(file);
            if (filePath != null) {
                SubmissionFile submissionFile = new SubmissionFile();
                submissionFile.setFileName(file.getOriginalFilename());
                submissionFile.setFilePath(filePath);
                submissionFile.setSubmission(submission);
                submissionFileRepository.save(submissionFile);
            }
        }
    }
}
