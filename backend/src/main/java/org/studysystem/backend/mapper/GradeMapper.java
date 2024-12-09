package org.studysystem.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.studysystem.backend.dto.request.GradeRequest;
import org.studysystem.backend.dto.response.GradeResponse;
import org.studysystem.backend.entity.Grade;

@Mapper(componentModel = "spring")
public interface GradeMapper {
    Grade toGrade(GradeRequest gradeRequest);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "user.username", target = "username")
    GradeResponse toGradeResponse(Grade grade);
}
