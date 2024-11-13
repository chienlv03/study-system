package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.dto.request.AssignmentRequest;
import org.studysystem.backend.dto.response.AssignmentResponse;
import org.studysystem.backend.entity.Assignment;
import org.studysystem.backend.entity.AssignmentFile;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.mapper.AssignmentMapper;
import org.studysystem.backend.repository.AssignmentFileRepository;
import org.studysystem.backend.repository.AssignmentRepository;
import org.studysystem.backend.service.AssignmentService;
import org.studysystem.backend.utils.FileUtil;
import org.studysystem.backend.utils.FindEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final AssignmentFileRepository assignmentFileRepository;
    private final AssignmentMapper assignmentMapper;
    private final FindEntity findEntity;
    private final FileUtil fileUtil;

    @Transactional
    @Override
    public void createAssignment(AssignmentRequest assignmentRequest, MultipartFile[] files) {
        Course course = findEntity.findCourse(assignmentRequest.getCourseId());
        User user = findEntity.findUser(assignmentRequest.getUserId());

        Assignment assignment = assignmentMapper.toAssignment(assignmentRequest);
        assignment.setAssignedDate(LocalDateTime.now());
        assignment.setCourse(course);
        assignment.setUser(user);

        Assignment savedAssignment = assignmentRepository.save(assignment);

        if (files != null) {
            saveAssignmentFiles(files, savedAssignment);
        }
    }

    @Transactional
    @Override
    public void updateDueDate(Long assignmentId, LocalDateTime dueDate) {
        Assignment assignment = findEntity.findAssignment(assignmentId);
        assignment.setDueDate(dueDate);
        assignmentRepository.save(assignment);
    }


    @Override
    @Cacheable(value = "assignmentsByCourse", key = "#courseId")
    public List<AssignmentResponse> getAssignmentsByCourseId(Long courseId) {
        List<Assignment> assignments = assignmentRepository.findByCourseId(courseId);
        return assignments.stream()
                .map(assignmentMapper::toAssignmentResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void deleteAssignment(Long assignmentId) {
        Assignment assignment = findEntity.findAssignment(assignmentId);

        // Delete associated files from the file system and database
        assignment.getFiles().forEach(file -> fileUtil.deleteFile(file.getFilePath()));
        assignmentFileRepository.deleteByAssignmentId(assignmentId);

        // Delete the assignment
        assignmentRepository.delete(assignment);
    }

    private void saveAssignmentFiles(MultipartFile[] files, Assignment savedAssignment) {
        for (MultipartFile file : files) {
            String filePath = fileUtil.saveFile(file);
            if (filePath != null) {
                AssignmentFile assignmentFile = new AssignmentFile();
                assignmentFile.setFileName(file.getOriginalFilename());
                assignmentFile.setFilePath(filePath);
                assignmentFile.setAssignment(savedAssignment);
                assignmentFileRepository.save(assignmentFile);
            }
        }
    }

}