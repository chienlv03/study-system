package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.studysystem.backend.dto.request.UpdateScoresRequest;
import org.studysystem.backend.dto.response.*;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.Enrollment;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.exception.BadRequestException;
import org.studysystem.backend.mapper.EnrollmentMapper;
import org.studysystem.backend.repository.CourseRepository;
import org.studysystem.backend.repository.EnrollmentRepository;
import org.studysystem.backend.service.EnrollmentService;
import org.studysystem.backend.utils.FindEntity;
import org.studysystem.backend.utils.MessageConstants;
import org.studysystem.backend.utils.Validation;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentMapper enrollmentMapper;
    private final FindEntity findEntity;
    private final Validation validation;

    @Override
    public void enrollUserInCourse(Long userId, Long courseId, String classCode) {
        User user = findEntity.findUser(userId);
        Course course;

        if (classCode != null) {
            course = findEntity.findCourseByClassCode(classCode);
        } else {
            course = findEntity.findCourse(courseId);
        }

        validation.existUserInCourse(userId, courseId);

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);

        if (course.getCurrentStudents() >= course.getMaxStudents()) {
            throw new BadRequestException(MessageConstants.COURSE_FULL);
        }

        enrollmentRepository.save(enrollment);
        course.setCurrentStudents(course.getCurrentStudents() + 1);
        courseRepository.save(course);
    }

//    private void updateCurrentStudent(Long courseId) {
//        Course course = findEntity.findCourse(courseId);
//        int currentStudent = enrollmentRepository.countByCourseId(courseId);
//        course.setCurrentStudents(currentStudent);
//        courseRepository.save(course);
//    }

    @Override
    public LearnBecomesResponse updateScores(Long enrollmentId, UpdateScoresRequest request) {
        Enrollment enrollment = findEntity.findCourseEnrollment(enrollmentId);

        enrollment.setProgressScore(request.getProgressScore());
        enrollment.setFinalScore(request.getFinalScore());

        // Calculate courseScore based on provided coefficients
        double courseScore = request.getProgressScore() * 0.3 +
                request.getFinalScore() * 0.7;
        BigDecimal formattedCourseScore = BigDecimal.valueOf(courseScore).setScale(2, RoundingMode.HALF_UP);
        enrollment.setCourseScore(formattedCourseScore.doubleValue());
        enrollmentRepository.save(enrollment);
        return enrollmentMapper.toLearnBecomesResponse(enrollment);
    }

    @Override
    public LearnBecomesResponse getCourseEnrollment(Long userId, Long courseId) {
        Enrollment enrollment = findEntity.findByUserIdAndCourseId(userId, courseId);
        return enrollmentMapper.toLearnBecomesResponse(enrollment);
    }

    @Override
    public List<LearnBecomesResponse> getAllEnrollmentsByUserId(Long userId) {
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
        return enrollments.stream()
                .map(enrollmentMapper::toLearnBecomesResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserResponse> getAllUsersInCourse(Long courseId) {
        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId);
        return enrollments.stream()
                .map(enrollment -> {
                    User user = enrollment.getUser();
                    return UserResponse.builder()
                            .id(user.getId())
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
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
        return enrollments.stream()
                .map(enrollment -> {
                    Course course = enrollment.getCourse();
                    return CourseInfoResponse.builder()
                            .id(course.getId())
                            .name(course.getName())
                            .classCode(course.getClassCode())
                            .startTime(course.getStartTime())
                            .endTime(course.getEndTime())
                            .maxStudents(course.getMaxStudents())
                            .currentStudents(course.getCurrentStudents())
                            .userId(course.getUser().getId())
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<AbsentResponse> getAbsencesForUserInCourse(Long courseId) {
        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId);
        return enrollments.stream()
                .map(enrollmentMapper::toAbsentResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void removeUserFromCourse(Long userId, Long courseId) {
        Enrollment enrollment = findEntity.findByUserIdAndCourseId(userId, courseId);
        Course course = findEntity.findCourse(courseId);
        enrollmentRepository.delete(enrollment);
        course.setCurrentStudents(course.getCurrentStudents() - 1);
        courseRepository.save(course);
    }

    @Override
    public List<UserAttendanceResponse> getAllUsersAndAttendanceInCourse(Long courseId) {
        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId);
        return enrollments.stream()
                .map(enrollmentMapper::toUserAttendanceResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<GradeResponse> getGradesForCourse(Long courseId) {
        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId);
        return enrollments.stream()
                .map(enrollmentMapper::toGradeResponse)
                .collect(Collectors.toList());
    }

}
