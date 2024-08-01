package org.studysystem.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.studysystem.backend.dto.response.AttendanceResponse;
import org.studysystem.backend.entity.Attendance;

@Mapper(componentModel = "spring")
public interface AttendanceMapper {
    @Mapping(source = "courseEnrollment.user.id", target = "userId")
    @Mapping(source = "courseEnrollment.course.id", target = "courseId")
    @Mapping(source = "courseEnrollment.unexcusedAbsenceCount", target = "unexcusedAbsenceCount")
    @Mapping(source = "courseEnrollment.excusedAbsenceCount", target = "excusedAbsenceCount")
    AttendanceResponse toAttendanceResponse(Attendance attendance);
}
