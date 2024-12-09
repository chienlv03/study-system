package org.studysystem.backend.service;

import org.studysystem.backend.dto.request.GradeRequest;
import org.studysystem.backend.dto.response.GradeResponse;

import java.util.List;

public interface GradeService {
    void CreateGrade(Long userId, Long courseId, GradeRequest gradeRequest);

    void updateGrade(Long gradeId, GradeRequest gradeRequest);

    List<GradeResponse> getGradeByUserId(Long userId);

    List<GradeResponse> getGradeByCourseId(Long courseId);
}
