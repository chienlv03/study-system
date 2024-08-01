package org.studysystem.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.studysystem.backend.dto.request.AttendanceRequest;
import org.studysystem.backend.dto.response.AbsentResponse;
import org.studysystem.backend.dto.response.LearnBecomesResponse;
import org.studysystem.backend.dto.response.GradeResponse;
import org.studysystem.backend.dto.response.UserAttendanceResponse;
import org.studysystem.backend.entity.Attendance;
import org.studysystem.backend.entity.CourseEnrollment;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CourseEnrollmentMapper {
    @Mapping(source = "course.classCode", target = "classCode")
    @Mapping(source = "course.name", target = "name")
    LearnBecomesResponse toLearnBecomesResponse(CourseEnrollment courseEnrollment);

    @Mapping(source = "user.id", target = "id")
    @Mapping(source = "user.code", target = "code")
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "user.email", target = "email")
    @Mapping(source = "user.dob", target = "dob")
    @Mapping(source = "user.gender", target = "gender")
    @Mapping(target = "attendanceRecords", expression = "java(mapAttendances(enrollment.getAttendances()))")
    UserAttendanceResponse toUserAttendanceResponse(CourseEnrollment enrollment);

    default List<AttendanceRequest> mapAttendances(List<Attendance> attendances) {
        return attendances.stream()
                .map(attendance -> new AttendanceRequest(attendance.getAttendanceTime(), attendance.getStatus()))
                .collect(Collectors.toList());
    }

    @Mapping(source = "courseEnrollment.id", target = "enrollmentId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.code", target = "code")
    @Mapping(source = "user.username", target = "username")
    GradeResponse toGradeResponse(CourseEnrollment courseEnrollment);

    @Mapping(source = "user.id", target = "userId")
    AbsentResponse toAbsentResponse(CourseEnrollment courseEnrollment);
}
