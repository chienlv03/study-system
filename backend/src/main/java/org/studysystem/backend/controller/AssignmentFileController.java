package org.studysystem.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studysystem.backend.dto.response.FileResponse;
import org.studysystem.backend.service.AssignmentFileService;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/assignmentFile")
public class AssignmentFileController {
    private final AssignmentFileService assignmentFileService;

    @GetMapping("/by-assignment/{assignmentId}")
    public ResponseEntity<List<FileResponse>> getFilesByAssignment(@PathVariable Long assignmentId) throws IOException {
        List<FileResponse> fileResponseList = assignmentFileService.getFilesByAssignment(assignmentId);
        return ResponseEntity.ok(fileResponseList);
    }
}
