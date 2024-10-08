package org.studysystem.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.studysystem.backend.dto.response.AttendanceResponse;
import org.studysystem.backend.entity.Attendance;

@Mapper(componentModel = "spring")
public interface AttendanceMapper {
    @Mapping(source = "enrollment.user.id", target = "userId")
    @Mapping(source = "enrollment.course.id", target = "courseId")
    @Mapping(source = "enrollment.unexcusedAbsenceCount", target = "unexcusedAbsenceCount")
    @Mapping(source = "enrollment.excusedAbsenceCount", target = "excusedAbsenceCount")
    AttendanceResponse toAttendanceResponse(Attendance attendance);
}
