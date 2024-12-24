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
        // Tìm các entity liên quan
        Assignment assignment = findEntity.findAssignment(submissionRequest.getAssignmentId());
        User user = findEntity.findUser(submissionRequest.getUserId());
        Course course = findEntity.findCourse(submissionRequest.getCourseId());

        // Tìm submission cũ nếu tồn tại
        Submission existingSubmission = submissionRepository
                .findByAssignmentIdAndUserId(assignment.getId(), user.getId());


        Submission submission;

        if (existingSubmission != null) {
            // Nếu submission tồn tại, ghi đè
            submission = existingSubmission;
            submissionMapper.updateSubmissionFromRequest(submissionRequest, submission); // Hàm mapper cập nhật
        } else {
            // Nếu submission không tồn tại, tạo mới
            submission = submissionMapper.toSubmission(submissionRequest);
            submission.setAssignment(assignment);
            submission.setUser(user);
            submission.setCourse(course);
        }

        // Cập nhật thông tin submission
        submission.setSubmittedDate(LocalDateTime.now());
        submission.setLate(submission.getSubmittedDate().isAfter(assignment.getDueDate()));

        // Lưu submission
        Submission savedSubmission = submissionRepository.save(submission);

        // Cập nhật tổng số submissions cho assignment
        assignment.setTotalSubmissions(submissionRepository.countTotalSubmissionsByAssignmentId(assignment.getId()));
        assignmentRepository.save(assignment);

        // Xử lý file
        if (existingSubmission != null) {
            // Xóa các file cũ nếu submission đã tồn tại
            deleteFilesForSubmission(existingSubmission);
        }
        saveFilesForSubmission(files, savedSubmission);
    }


    @Override
    public String checkSubmitted(Long assignmentId, Long userId) {
        if (submissionRepository.existsByAssignmentIdAndUserId(assignmentId, userId)) {
            return "true";
        } else {
            return "false";
        }
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

    private void deleteFilesForSubmission(Submission submission) {
        List<SubmissionFile> files = submissionFileRepository.findBySubmissionId(submission.getId());
        files.forEach(file -> {
            fileUtil.deleteFile(file.getFilePath()); // Hàm xóa file
            submissionFileRepository.delete(file);
        });
    }

}
