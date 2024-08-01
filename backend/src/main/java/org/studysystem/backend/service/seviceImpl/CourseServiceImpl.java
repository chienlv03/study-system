package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.studysystem.backend.dto.request.CourseRequest;
import org.studysystem.backend.dto.response.CourseInfoResponse;
import org.studysystem.backend.entity.Course;
import org.studysystem.backend.entity.CourseEnrollment;
import org.studysystem.backend.mapper.CourseMapper;
import org.studysystem.backend.repository.AttendanceRepository;
import org.studysystem.backend.repository.CourseEnrollmentRepository;
import org.studysystem.backend.repository.CourseRepository;
import org.studysystem.backend.repository.UserRepository;
import org.studysystem.backend.service.CourseService;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final UserRepository userRepository;
    private final CourseMapper courseMapper;
    private final CourseRepository courseRepository;
    private final CourseEnrollmentRepository courseEnrollmentRepository;
    private final AttendanceRepository attendanceRepository;
//    private final Atte

    @Override
    public CourseInfoResponse createCourse(CourseRequest courseRequest, Long userId) {

        if(courseRepository.existsByClassCode(courseRequest.getClassCode())) {
            throw new RuntimeException("Class code already exists");
        }

        Course course = courseMapper.toCourse(courseRequest);
        course.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId)));

        return courseMapper.toCourseInfoResponse(courseRepository.save(course));
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
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setName(courseRequest.getName());
        course.setClassCode(courseRequest.getClassCode());
        course.setStartTime(courseRequest.getStartTime());
        return courseMapper.toCourseInfoResponse(courseRepository.save(course));
    }

//    @Transactional
    @Override
    public void deleteCourse(Long id) {
        // Find all StudentClassroom records related to the classroom
        List<CourseEnrollment> courseEnrollments = courseEnrollmentRepository.findByCourseId(id);
        for (CourseEnrollment enrollment : courseEnrollments) {
            attendanceRepository.deleteAll(enrollment.getAttendances());
            courseEnrollmentRepository.delete(enrollment);
        }
        // Finally, delete the classroom
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        courseRepository.delete(course);
    }
}
