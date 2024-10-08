package org.studysystem.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studysystem.backend.dto.request.CourseRequest;
import org.studysystem.backend.dto.response.CourseInfoResponse;
import org.studysystem.backend.dto.response.MessageResponse;
import org.studysystem.backend.service.CourseService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/course")
public class CourseController {

    private final CourseService courseService;

//    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/create/{userId}")
    public ResponseEntity<CourseInfoResponse> createCourse(@RequestBody CourseRequest courseRequest, @PathVariable Long userId) {

        CourseInfoResponse createdCourse = courseService.createCourse(courseRequest, userId);
        return ResponseEntity.ok(createdCourse);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CourseInfoResponse> updateClassRoom(@PathVariable Long id, @RequestBody CourseRequest courseRequest) {
        CourseInfoResponse updatedCourse = courseService.updateCourse(id, courseRequest);
        return ResponseEntity.ok(updatedCourse);
    }

    // lấy tât cả các course đã tạo của 1 user
    @GetMapping("/get/by/user/{userId}")
    public ResponseEntity<List<CourseInfoResponse>> getAllCoursesByUserId(@PathVariable Long userId) {
        List<CourseInfoResponse> courses = courseService.getAllCoursesByUserId(userId);
        return ResponseEntity.ok(courses);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<MessageResponse> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(new MessageResponse("Course deleted successfully"));
    }
}
