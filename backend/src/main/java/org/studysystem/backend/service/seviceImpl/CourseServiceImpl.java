package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.studysystem.backend.dto.request.CourseRequest;
import org.studysystem.backend.dto.response.CourseInfoResponse;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.Enrollment;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.mapper.CourseMapper;
import org.studysystem.backend.repository.AttendanceRepository;
import org.studysystem.backend.repository.EnrollmentRepository;
import org.studysystem.backend.repository.CourseRepository;
import org.studysystem.backend.service.CourseService;
import org.studysystem.backend.utils.FindEntity;
import org.studysystem.backend.utils.Validation;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseMapper courseMapper;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AttendanceRepository attendanceRepository;
    private final Validation validation;
    private final FindEntity findEntity;
//    private final Atte

    @Override
    public CourseInfoResponse createCourse(CourseRequest courseRequest, Long userId) {

        User user = findEntity.findUser(userId);

        String generatedCode;
        do {
            generatedCode = generateCode();
        } while (courseRepository.existsByClassCode(generatedCode));

        validation.validateCourseTime(courseRequest.getStartTime(), courseRequest.getEndTime());

        Course course = courseMapper.toCourse(courseRequest);
        course.setClassCode(generatedCode);
        course.setUser(user);

        return courseMapper.toCourseInfoResponse(courseRepository.save(course));
    }

    private String generateCode() {

        // Tạo 6 chữ số ngẫu nhiên
        Random random = new Random();
        int randomDigits = random.nextInt(10000);

        // Kết hợp hai phần
        return String.format("%06d", randomDigits);
    }

    public void updateCurrentStudent(Long courseId) {
        Course course = findEntity.findCourse(courseId);
        int currentStudent = enrollmentRepository.countByCourseId(courseId);
        course.setCurrentStudents(currentStudent);
        courseRepository.save(course);
    }

    @Override
    public List<CourseInfoResponse> getAllCoursesByUserId(Long userId) {
        List<Course> courses = courseRepository.findAllByUserId(userId);
        return courses.stream()
                .map(courseMapper::toCourseInfoResponse)
                .collect(Collectors.toList());
    }

//    public List<ClassRoom> getAllClassrooms() {
//        return classroomRepository.findAll();
//    }

    @Override
    public CourseInfoResponse updateCourse(Long id, CourseRequest courseRequest) {
        Course course = findEntity.findCourse(id);

        course.setName(courseRequest.getName());
        course.setStartTime(courseRequest.getStartTime());
        return courseMapper.toCourseInfoResponse(courseRepository.save(course));
    }

//    @Transactional
    @Override
    public void deleteCourse(Long id) {
        // Find all StudentClassroom records related to the classroom
        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(id);
        for (Enrollment enrollment : enrollments) {
            attendanceRepository.deleteAll(enrollment.getAttendances());
            enrollmentRepository.delete(enrollment);
        }
        // Finally, delete the classroom
        Course course = findEntity.findCourse(id);
        courseRepository.delete(course);
    }
}
