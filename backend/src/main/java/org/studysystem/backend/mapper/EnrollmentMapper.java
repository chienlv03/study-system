package org.studysystem.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.studysystem.backend.dto.request.AttendanceRequest;
import org.studysystem.backend.dto.response.AbsentResponse;
import org.studysystem.backend.dto.response.LearnBecomesResponse;
import org.studysystem.backend.dto.response.UserAttendanceResponse;
import org.studysystem.backend.entity.Attendance;
import org.studysystem.backend.entity.Enrollment;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface EnrollmentMapper {
    @Mapping(source = "course.classCode", target = "classCode")
    @Mapping(source = "course.name", target = "name")
    LearnBecomesResponse toLearnBecomesResponse(Enrollment enrollment);

    @Mapping(source = "user.id", target = "id")
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.dob", target = "dob")
    @Mapping(source = "user.gender", target = "gender")
    @Mapping(target = "attendanceRecords", expression = "java(mapAttendances(enrollment.getAttendances()))")
    UserAttendanceResponse toUserAttendanceResponse(Enrollment enrollment);

    default List<AttendanceRequest> mapAttendances(List<Attendance> attendances) {
        return attendances.stream()
                .map(attendance -> new AttendanceRequest(attendance.getAttendanceTime(), attendance.getStatus()))
                .collect(Collectors.toList());
    }

    @Mapping(source = "user.id", target = "userId")
    AbsentResponse toAbsentResponse(Enrollment enrollment);
}
