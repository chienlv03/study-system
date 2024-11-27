package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.studysystem.backend.dto.request.UpdateScoresRequest;
import org.studysystem.backend.dto.response.*;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.Enrollment;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.exception.BadRequestException;
import org.studysystem.backend.mapper.EnrollmentMapper;
import org.studysystem.backend.repository.CourseRepository;
import org.studysystem.backend.repository.EnrollmentRepository;
import org.studysystem.backend.repository.UserRepository;
import org.studysystem.backend.service.EnrollmentService;
import org.studysystem.backend.utils.FindEntity;
import org.studysystem.backend.utils.MessageConstants;
import org.studysystem.backend.utils.Validation;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
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

    @Override
    public List<String> importStudents(MultipartFile file, Long courseId) {
        List<String> errorMessages = new ArrayList<>();

        // Lấy lớp học từ courseId
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty()) {
            throw new IllegalArgumentException("Course with ID '" + courseId + "' does not exist.");
        }
        Course course = optionalCourse.get();

        List<String> emailsFromFile = new ArrayList<>();

        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            int rowCount = 0;

            for (Row row : sheet) {
                if (rowCount++ == 0) continue; // Bỏ qua dòng tiêu đề
                String email = row.getCell(0).getStringCellValue().trim();
                emailsFromFile.add(email);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading Excel file: " + e.getMessage());
        }

        // Kiểm tra tất cả email trong cơ sở dữ liệu
        List<User> users = userRepository.findByEmailIn(emailsFromFile);
        Set<String> existingEmails = users.stream().map(User::getEmail).collect(Collectors.toSet());

        for (String email : emailsFromFile) {
            if (!existingEmails.contains(email)) {
                errorMessages.add("Email '" + email + "' does not exist.");
            }
        }

        // Nếu có lỗi, trả về danh sách lỗi và không thực hiện enroll
        if (!errorMessages.isEmpty()) {
            return errorMessages;
        }

        // Thêm sinh viên vào lớp nếu tất cả email hợp lệ
        int currentStudents = 0;
        for (User user : users) {
            boolean alreadyEnrolled = enrollmentRepository.existsByUserAndCourse(user, course);
            if (alreadyEnrolled) {
                errorMessages.add("User '" + user.getEmail() + "' is already enrolled in the course.");
                continue;
            }

            Enrollment enrollment = new Enrollment();
            enrollment.setUser(user);
            enrollment.setCourse(course);
            enrollmentRepository.save(enrollment);
            currentStudents++;
        }

        if (currentStudents > 0) {
            course.setCurrentStudents(course.getCurrentStudents() + currentStudents);
            courseRepository.save(course);
        }

        return errorMessages;
    }
}
