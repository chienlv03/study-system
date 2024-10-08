package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.entity.Assignments;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.repository.AssignmentRepository;
import org.studysystem.backend.service.AssignmentService;
import org.studysystem.backend.service.FileStorageService;
import org.studysystem.backend.utils.FindEntity;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService {


    private final AssignmentRepository assignmentRepository;
    private final FileStorageService fileStorageService;
    private final FindEntity findEntity;

    @Override
    public void createAssignment(String title, String description, String content,
                                 MultipartFile file, MultipartFile image,
                                 Long courseId, Long userId, LocalDateTime dueDate) throws IOException {
        Course course = findEntity.findCourse(courseId);
        User user = findEntity.findUser(userId);


        Assignments assignment = new Assignments();
        assignment.setTitle(title);
        assignment.setDescription(description);
        assignment.setContent(content);
        assignment.setCourse(course);
        assignment.setUser(user);
        assignment.setDueDate(dueDate);

        if (file != null && !file.isEmpty()) {
            String fileUrl = fileStorageService.storeFile(file);
            assignment.setFileUrl(fileUrl);
        }
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image);
            assignment.setImageUrl(imageUrl);
        }
        assignmentRepository.save(assignment);
    }
}

