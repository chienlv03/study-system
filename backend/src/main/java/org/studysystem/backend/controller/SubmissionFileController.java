package org.studysystem.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studysystem.backend.dto.response.FileResponse;
import org.studysystem.backend.service.SubmissionFileService;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/submissionFiles")
public class SubmissionFileController {

    private final SubmissionFileService submissionFileService;

    @GetMapping("/by-submission/{submissionId}")
    public ResponseEntity<List<FileResponse>> getFilesBySubmission(@PathVariable Long submissionId) throws IOException {
        List<FileResponse> fileResponseList = submissionFileService.getFilesByAssignment(submissionId);
        return ResponseEntity.ok(fileResponseList);
    }
}
