package org.studysystem.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.studysystem.backend.dto.request.AssignmentRequest;
import org.studysystem.backend.dto.response.AssignmentResponse;
import org.studysystem.backend.entity.Assignment;

@Mapper(componentModel = "spring")
public interface AssignmentMapper {
    Assignment toAssignment(AssignmentRequest request);

    @Mapping(source = "course.name", target = "courseName")
    @Mapping(source = "user.username", target = "userName")
    AssignmentResponse toAssignmentResponse(Assignment assignment);
}
