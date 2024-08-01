package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.studysystem.backend.dto.request.UpdateScoresRequest;
import org.studysystem.backend.dto.response.*;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.CourseEnrollment;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.mapper.CourseEnrollmentMapper;
import org.studysystem.backend.repository.CourseEnrollmentRepository;
import org.studysystem.backend.repository.CourseRepository;
import org.studysystem.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.studysystem.backend.service.CourseEnrollmentService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseEnrollmentServiceImpl implements CourseEnrollmentService {

    private final CourseEnrollmentRepository courseEnrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CourseEnrollmentMapper courseEnrollmentMapper;

    @Override
    public void enrollUserInCourse(Long userId, Long courseId, String classCode) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Course course;

        if (classCode != null) {
            course = courseRepository.findByClassCode(classCode)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy mã lớp học"));
        } else {
            course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));
        }

        if (courseEnrollmentRepository.existsByUserIdAndCourseId(userId, course.getId())) {
            throw new RuntimeException("Học sinh đã tham gia khóa học này");
        }

        CourseEnrollment enrollment = new CourseEnrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);

        courseEnrollmentRepository.save(enrollment);
    }

    @Override
    public LearnBecomesResponse updateScores(Long enrollmentId, UpdateScoresRequest request) {
        CourseEnrollment enrollment = courseEnrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setProgressScore(request.getProgressScore());
        enrollment.setFinalScore(request.getFinalScore());

        // Calculate courseScore based on provided coefficients
        double courseScore = request.getProgressScore() * 0.3 +
                request.getFinalScore() * 0.7;
        BigDecimal formattedCourseScore = BigDecimal.valueOf(courseScore).setScale(2, RoundingMode.HALF_UP);
        enrollment.setCourseScore(formattedCourseScore.doubleValue());
        courseEnrollmentRepository.save(enrollment);
        return courseEnrollmentMapper.toLearnBecomesResponse(enrollment);
    }

    @Override
    public LearnBecomesResponse getCourseEnrollment(Long userId, Long courseId) {
        CourseEnrollment enrollment = courseEnrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        return courseEnrollmentMapper.toLearnBecomesResponse(enrollment);
    }

    @Override
    public List<LearnBecomesResponse> getAllCourseEnrollmentsByUserId(Long userId) {
        List<CourseEnrollment> enrollments = courseEnrollmentRepository.findByUserId(userId);
        return enrollments.stream()
                .map(courseEnrollmentMapper::toLearnBecomesResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserResponse> getAllUsersInCourse(Long courseId) {
        List<CourseEnrollment> enrollments = courseEnrollmentRepository.findByCourseId(courseId);
        return enrollments.stream()
                .map(enrollment -> {
                    User user = enrollment.getUser();
                    return UserResponse.builder()
                            .id(user.getId())
                            .code(user.getCode())
                            .username(user.getUsername())
                            .email(user.getEmail())
                            .dob(user.getDob())
                            .gender(user.getGender())
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<CourseInfoResponse> getAllCoursesOfUser(Long userId) {
        List<CourseEnrollment> enrollments = courseEnrollmentRepository.findByUserId(userId);
        return enrollments.stream()
                .map(enrollment -> {
                    Course course = enrollment.getCourse();
                    return CourseInfoResponse.builder()
                            .id(course.getId())
                            .name(course.getName())
                            .classCode(course.getClassCode())
                            .startTime(course.getStartTime())
                            .userId(course.getUser().getId())
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<AbsentResponse> getAbsencesForUserInCourse(Long courseId) {
        List<CourseEnrollment> enrollments = courseEnrollmentRepository.findByCourseId(courseId);
        return enrollments.stream()
                .map(courseEnrollmentMapper::toAbsentResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void removeUserFromCourse(Long userId, Long courseId) {
        CourseEnrollment enrollment = courseEnrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        courseEnrollmentRepository.delete(enrollment);
    }

    @Override
    public List<UserAttendanceResponse> getAllUsersAndAttendanceInCourse(Long courseId) {
        List<CourseEnrollment> enrollments = courseEnrollmentRepository.findByCourseId(courseId);
        return enrollments.stream()
                .map(courseEnrollmentMapper::toUserAttendanceResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<GradeResponse> getGradesForCourse(Long courseId) {
        List<CourseEnrollment> enrollments = courseEnrollmentRepository.findByCourseId(courseId);
        return enrollments.stream()
                .map(courseEnrollmentMapper::toGradeResponse)
                .collect(Collectors.toList());
    }

}
