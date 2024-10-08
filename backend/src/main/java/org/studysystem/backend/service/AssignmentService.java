package org.studysystem.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

public interface AssignmentService {
    void createAssignment(String title, String description, String content,
                          MultipartFile file, MultipartFile image,
                          Long courseId, Long userId, LocalDateTime dueDate) throws IOException;
}
