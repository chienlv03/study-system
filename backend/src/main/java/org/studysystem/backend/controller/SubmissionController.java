package org.studysystem.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.dto.request.AssignmentRequest;
import org.studysystem.backend.dto.request.SubmissionRequest;
import org.studysystem.backend.dto.request.UpdateGradeAndFeedbackRequest;
import org.studysystem.backend.dto.response.SubmissionResponse;
import org.studysystem.backend.service.SubmissionService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/submission")
public class SubmissionController {
    private final SubmissionService submissionService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadAssignment(@Valid
                                                   @RequestPart("submission") String submissionJson,  // Nhận chuỗi JSON cho Assignment
                                                   @RequestPart(value = "files", required = false) MultipartFile[] files) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        SubmissionRequest submissionRequest = objectMapper.readValue(submissionJson, SubmissionRequest.class);
        submissionService.createSubmission(submissionRequest, files);

        return ResponseEntity.ok("Submission uploaded successfully!");
    }

    @GetMapping("/assignment/{assignmentId}/user/{userId}")
    public ResponseEntity<String> checkIsSubmitted(@PathVariable Long assignmentId, @PathVariable Long userId) {
        return ResponseEntity.ok(submissionService.checkSubmitted(assignmentId, userId));
    }

    @PutMapping(value = "/{submissionId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateSubmission(@PathVariable Long submissionId,
                                                   @Valid @RequestPart("submission") String submissionJson,
                                                   @RequestPart(value = "files", required = false) MultipartFile[] files) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        SubmissionRequest submissionRequest = objectMapper.readValue(submissionJson, SubmissionRequest.class);
        submissionService.updateSubmission(submissionId, submissionRequest, files);

        return ResponseEntity.ok("Submission updated successfully!");
    }

    @PutMapping("/{submissionId}")
    public ResponseEntity<String> updateGradeAndFeedback(@PathVariable Long submissionId, @RequestBody UpdateGradeAndFeedbackRequest request) {
        submissionService.updateGradeAndFeedback(submissionId, request);
        return ResponseEntity.ok("Grade and feedback updated successfully!");
    }

    @GetMapping("/assignment/{assignmentId}")
    public ResponseEntity<List<SubmissionResponse>> getSubmissionByAssignment(@PathVariable Long assignmentId) {
        return ResponseEntity.ok(submissionService.getSubmissionByAssignmentId(assignmentId));
    }

    @GetMapping("/user/{userId}/course/{courseId}")
    public ResponseEntity<List<SubmissionResponse>> getSubmissionByUserAndCourse(@PathVariable Long userId, @PathVariable Long courseId) {
        return ResponseEntity.ok(submissionService.getSubmissionByUserIdAndCourseId(userId, courseId));
    }

    @DeleteMapping("/{submissionId}/assignment/{assignmentId}")
    public ResponseEntity<String> deleteSubmission(@PathVariable Long submissionId, @PathVariable Long assignmentId) {
        submissionService.deleteSubmission(submissionId, assignmentId);
        return ResponseEntity.ok("Submission deleted successfully!");
    }
}
