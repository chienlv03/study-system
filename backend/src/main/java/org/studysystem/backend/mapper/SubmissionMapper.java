package org.studysystem.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.studysystem.backend.dto.request.SubmissionRequest;
import org.studysystem.backend.dto.response.SubmissionResponse;
import org.studysystem.backend.entity.Submission;

@Mapper(componentModel = "spring")
public interface SubmissionMapper {
    Submission toSubmission(SubmissionRequest request);

    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "assignment.point", target = "point")
    @Mapping(source = "assignment.title", target = "title")
    @Mapping(source = "assignment.id", target = "assignmentId")
    SubmissionResponse toSubmissionResponse(Submission submission);

    void updateSubmissionFromRequest(SubmissionRequest request, @MappingTarget Submission submission);
}
