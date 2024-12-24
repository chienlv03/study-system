

import api from "../AxiosConfig";

const COURSE_API_BASE_URL = "http://localhost:8080/api/";

export const enrollCourse = (userId, courseId, classCode) => api.post(`${COURSE_API_BASE_URL}enroll/user/${userId}/course/${courseId}`, null, { params: { classCode } });

export const getEnrollInCourse = (courseId, userId) => api.get(`${COURSE_API_BASE_URL}get/enrollment/course/${courseId}/user/${userId}`);

export const getEnrollByUserId = (userId) => api.get(`${COURSE_API_BASE_URL}get/enrollments/user/${userId}`);

export const getUserInCourse = (courseId) => api.get(`${COURSE_API_BASE_URL}get/user/in/course/${courseId}`);

export const getAllCourseTheUserParticipated = (userId) => api.get(`${COURSE_API_BASE_URL}get/course/of/user/${userId}`);

export const getAbsentInCourse = (courseId) => api.get(`${COURSE_API_BASE_URL}get/absent/in/course/${courseId}`);

export const removeUserFromCourse = (userId, courseId) => api.delete(COURSE_API_BASE_URL + "remove/user/" + userId + "/course/" + courseId);

export const getUserAndAttendInCourse = (courseId) => api.get(`${COURSE_API_BASE_URL}get/user/attendance/in/course/${courseId}`);

export const importExcel = (file, courseId) => api.post(`${COURSE_API_BASE_URL}import/course/${courseId}`, file, { headers: { 'Content-Type': 'multipart/form-data' } });

export const getLearningOutcomesByUserId = (userId) => api.get(`${COURSE_API_BASE_URL}learning-outcomes/user/${userId}`);