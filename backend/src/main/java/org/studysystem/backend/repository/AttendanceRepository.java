package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.studysystem.backend.entity.Attendance;
import org.studysystem.backend.entity.Enrollment;

import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByEnrollmentAndAttendanceTime(Enrollment enrollment, String attendanceTime);

    @Query("SELECT DISTINCT a.attendanceTime FROM Attendance a WHERE a.enrollment.course.id = :courseId")
    List<String> findDistinctAttendanceTimesByCourseId(@Param("courseId") Long courseId);
}
