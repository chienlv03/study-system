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
import org.studysystem.backend.dto.response.AssignmentResponse;
import org.studysystem.backend.service.AssignmentService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/assignment")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadAssignment(@Valid
                                                   @RequestPart("assignment") String assignmentJson,  // Nhận chuỗi JSON cho Assignment
                                                   @RequestPart(value = "files", required = false) MultipartFile[] files) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        AssignmentRequest assignmentRequest = objectMapper.readValue(assignmentJson, AssignmentRequest.class);
        assignmentService.createAssignment(assignmentRequest, files);

        return ResponseEntity.ok("Assignment uploaded successfully!");
    }

    @PatchMapping(value = "/{assignmentId}/due-date")
    public ResponseEntity<String> updateDueDate(@PathVariable Long assignmentId, @RequestBody Map<String, LocalDateTime> payload) {
        LocalDateTime dueDate = payload.get("dueDate");
        assignmentService.updateDueDate(assignmentId, dueDate);
        return ResponseEntity.ok("Due date updated successfully!");
    }


    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<AssignmentResponse>> getAssignmentsByCourse(@PathVariable Long courseId) {
        List<AssignmentResponse> assignmentResponse = assignmentService.getAssignmentsByCourseId(courseId);
        return ResponseEntity.ok(assignmentResponse);
    }

    @DeleteMapping("/{assignmentId}")
    public ResponseEntity<String> deleteAssignment(@PathVariable Long assignmentId) {
        assignmentService.deleteAssignment(assignmentId);
        return ResponseEntity.ok("Assignment deleted successfully!");
    }
}
