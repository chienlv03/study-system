package org.studysystem.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.service.AssignmentService;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping("/create")
    public ResponseEntity<String> createAssignment(
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("classRoomId") Long courseId,
            @RequestParam("teacherId") Long userId,
            @RequestParam("dueDate") LocalDateTime dueDate) throws IOException {

        assignmentService.createAssignment(title, description, content, file, image, courseId, userId, dueDate);
        return ResponseEntity.ok("Assignment created successfully");
    }
}
