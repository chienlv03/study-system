package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.studysystem.backend.dto.request.CreateAttendanceRequest;
import org.studysystem.backend.dto.request.UpdateAttendanceRequest;
import org.studysystem.backend.dto.response.AttendanceResponse;
import org.studysystem.backend.entity.Attendance;
import org.studysystem.backend.entity.Enrollment;
import org.studysystem.backend.entity.enums.AttendanceStatus;
import org.studysystem.backend.exception.ResourceNotFoundException;
import org.studysystem.backend.mapper.AttendanceMapper;
import org.studysystem.backend.repository.AttendanceRepository;
import org.studysystem.backend.repository.EnrollmentRepository;
import org.studysystem.backend.service.AttendanceService;
import org.studysystem.backend.utils.FindEntity;
import org.studysystem.backend.utils.MessageConstants;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AttendanceMapper attendanceMapper;
    private final FindEntity findEntity;

    @Override
    public List<AttendanceResponse> createAttendanceRecords(Long courseId, CreateAttendanceRequest request) {
        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId);

        if (enrollments.isEmpty()) {
            throw new ResourceNotFoundException(MessageConstants.COURSE_EMPTY);
        }

        List<Attendance> attendances = enrollments.stream().map(courseEnrollment -> {
            Attendance attendance = new Attendance();
            attendance.setEnrollment(courseEnrollment);
            attendance.setAttendanceTime(request.getAttendanceTime());
            attendance.setStatus(AttendanceStatus.PRESENT); // Default status
            return attendance;
        }).collect(Collectors.toList());

        List<Attendance> savedAttendances = attendanceRepository.saveAll(attendances);

        return savedAttendances.stream()
                .map(attendanceMapper::toAttendanceResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AttendanceResponse updateAttendanceStatus(Long userId, Long courseId, UpdateAttendanceRequest request) {
        Enrollment enrollment = findEntity.findByUserIdAndCourseId(userId, courseId);

        Attendance attendance = findEntity.findByCourseEnrollmentAndAttendanceTime(enrollment, request.getAttendanceTime());

        AttendanceStatus oldStatus = attendance.getStatus();
        AttendanceStatus newStatus = calculateStatus(request.getIsAbsent(), request.getIsExcused());

        attendance.setStatus(newStatus);
        attendanceRepository.save(attendance);

        updateAbsentCounts(userId, courseId, oldStatus, newStatus);

        return attendanceMapper.toAttendanceResponse(attendance);
    }


    private AttendanceStatus calculateStatus(Boolean isAbsent, Boolean isExcused) {
        if (isAbsent != null && isAbsent) {
            return isExcused != null && isExcused ? AttendanceStatus.ABSENT_EXCUSED : AttendanceStatus.ABSENT_UNEXCUSED;
        } else {
            return AttendanceStatus.PRESENT;
        }
    }

    private void updateAbsentCounts(Long userId, Long courseId, AttendanceStatus oldStatus, AttendanceStatus newStatus) {
        Enrollment studentClassroom = findEntity.findByUserIdAndCourseId(userId, courseId);

        if (oldStatus == AttendanceStatus.ABSENT_UNEXCUSED) {
            studentClassroom.setUnexcusedAbsenceCount(studentClassroom.getUnexcusedAbsenceCount() - 1);
        } else if (oldStatus == AttendanceStatus.ABSENT_EXCUSED) {
            studentClassroom.setExcusedAbsenceCount(studentClassroom.getExcusedAbsenceCount() - 1);
            if (studentClassroom.getExcusedAbsenceCount() % 2 != 0) {
                studentClassroom.setUnexcusedAbsenceCount(studentClassroom.getUnexcusedAbsenceCount() - 1);
            }
        }

        if (newStatus == AttendanceStatus.ABSENT_UNEXCUSED) {
            studentClassroom.setUnexcusedAbsenceCount(studentClassroom.getUnexcusedAbsenceCount() + 1);
        } else if (newStatus == AttendanceStatus.ABSENT_EXCUSED) {
            studentClassroom.setExcusedAbsenceCount(studentClassroom.getExcusedAbsenceCount() + 1);
            if (studentClassroom.getExcusedAbsenceCount() % 2 == 0) {
                studentClassroom.setUnexcusedAbsenceCount(studentClassroom.getUnexcusedAbsenceCount() + 1);
            }
        }

        enrollmentRepository.save(studentClassroom);
    }

    @Override
    public List<String> getDistinctAttendanceTimesByCourseId(Long courseId) {
        return attendanceRepository.findDistinctAttendanceTimesByCourseId(courseId);
    }
}
