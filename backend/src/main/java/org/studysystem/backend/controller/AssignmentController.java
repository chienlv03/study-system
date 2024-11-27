package org.studysystem.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.dto.request.AssignmentRequest;
import org.studysystem.backend.dto.request.UpdateDueDateRequest;
import org.studysystem.backend.dto.response.AssignmentResponse;
import org.studysystem.backend.service.AssignmentService;

import java.util.List;

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
        objectMapper.registerModule(new JavaTimeModule());
        AssignmentRequest assignmentRequest = objectMapper.readValue(assignmentJson, AssignmentRequest.class);
        assignmentService.createAssignment(assignmentRequest, files);

        return ResponseEntity.ok("Assignment uploaded successfully!");
    }

    @PutMapping("/{id}/due-date")
    public ResponseEntity<String> updateDueDate(
            @PathVariable Long id,
            @RequestBody @Validated UpdateDueDateRequest request) {
        assignmentService.updateDueDate(id, request.getDueDate());
        return ResponseEntity.ok("Hạn nộp đã được cập nhật thành công.");
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
