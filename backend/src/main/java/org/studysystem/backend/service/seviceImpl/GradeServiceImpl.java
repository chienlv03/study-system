package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.studysystem.backend.dto.request.GradeRequest;
import org.studysystem.backend.dto.response.GradeResponse;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.Grade;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.exception.ResourceNotFoundException;
import org.studysystem.backend.mapper.GradeMapper;
import org.studysystem.backend.repository.GradeRepository;
import org.studysystem.backend.service.GradeService;
import org.studysystem.backend.utils.FindEntity;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GradeServiceImpl implements GradeService {
    private final FindEntity findEntity;
    private final GradeMapper gradeMapper;
    private final GradeRepository gradeRepository;

    @Override
    public void CreateGrade(Long userId, Long courseId, GradeRequest gradeRequest) {
        User user = findEntity.findUser(userId);
        Course course = findEntity.findCourse(courseId);

        Grade grade = gradeMapper.toGrade(gradeRequest);
        grade.setUser(user);
        grade.setCourse(course);
        double courseScore = grade.getProgressScore()*0.4 + grade.getFinalScore()*0.7;
        grade.setCourseScore(courseScore);

        gradeRepository.save(grade);
    }

    @Override
    public void updateGrade(Long gradeId, GradeRequest gradeRequest) {
        Grade grade = gradeRepository.findById(gradeId).orElseThrow(() ->
                new ResourceNotFoundException("Grade not found"));
        grade.setProgressScore(gradeRequest.getProgressScore());
        grade.setFinalScore(gradeRequest.getFinalScore());

        double courseScore = grade.getProgressScore()*0.4 + grade.getFinalScore()*0.7;
        grade.setCourseScore(courseScore);

        gradeRepository.save(grade);
    }

    @Override
    public List<GradeResponse> getGradeByUserId(Long userId) {
        User user = findEntity.findUser(userId);
        List<Grade> grades = gradeRepository.findByUser(user);
        return grades.stream().map(gradeMapper::toGradeResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<GradeResponse> getGradeByCourseId(Long courseId) {
        Course course = findEntity.findCourse(courseId);
        List<Grade> grades = gradeRepository.findByCourse(course);
        return grades.stream().map(gradeMapper::toGradeResponse)
                .collect(Collectors.toList());
    }
}
