package org.studysystem.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.studysystem.backend.dto.request.CourseRequest;
import org.studysystem.backend.dto.response.CourseInfoResponse;
import org.studysystem.backend.entity.Course;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    Course toCourse(CourseRequest courseRequest);

    @Mapping(source = "user.id", target = "userId")
    CourseInfoResponse toCourseInfoResponse(Course course);
}
