package org.studysystem.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.service.SubmissionService;

import java.io.IOException;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitAssignment(
            @RequestParam("assignmentId") Long assignmentId,
            @RequestParam("studentId") Long studentId,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        submissionService.submitAssignment(assignmentId, studentId, content, file, image);
        return ResponseEntity.ok("Submission successful");
    }

    @PostMapping("/grade")
    public ResponseEntity<String> gradeSubmission(
            @RequestParam("submissionId") Long submissionId,
            @RequestParam("grade") Integer grade,
            @RequestParam("feedback") String feedback) {

        submissionService.gradeSubmission(submissionId, grade, feedback);
        return ResponseEntity.ok("Submission graded successfully");
    }
}
