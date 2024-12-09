package org.studysystem.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studysystem.backend.dto.request.GradeRequest;
import org.studysystem.backend.dto.response.GradeResponse;
import org.studysystem.backend.service.GradeService;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/grade")
public class GradeController {

    private final GradeService gradeService;

    @PostMapping("/user/{userId}/course/{courseId}")
    public ResponseEntity<String> createGrade(@PathVariable Long userId, @PathVariable Long courseId, @RequestBody GradeRequest gradeRequest) {
        gradeService.CreateGrade(userId, courseId, gradeRequest);
        return ResponseEntity.ok("Grade created successfully");
    }

    @PutMapping("/{gradeId}")
    public ResponseEntity<String> updateGrade(@PathVariable Long gradeId, @RequestBody GradeRequest gradeRequest) {
        gradeService.updateGrade(gradeId, gradeRequest);
        return ResponseEntity.ok("Grade updated successfully");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GradeResponse>> getGradeByUserId(@PathVariable Long userId) {
        List<GradeResponse> gradeResponse = gradeService.getGradeByUserId(userId);
        return ResponseEntity.ok(gradeResponse);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<GradeResponse>> getGradeByCourseId(@PathVariable Long courseId) {
        List<GradeResponse> gradeResponse = gradeService.getGradeByCourseId(courseId);
        return ResponseEntity.ok(gradeResponse);
    }
}
