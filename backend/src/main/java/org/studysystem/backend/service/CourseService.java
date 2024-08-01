package org.studysystem.backend.service;


import org.studysystem.backend.dto.request.CourseRequest;
import org.studysystem.backend.dto.response.CourseInfoResponse;

import java.util.List;

public interface CourseService {
    CourseInfoResponse createCourse(CourseRequest courseRequest, Long userId);

    List<CourseInfoResponse> getAllCoursesByUserId(Long userId);

    CourseInfoResponse updateCourse(Long id, CourseRequest courseRequest);

    void deleteCourse(Long id);
}
