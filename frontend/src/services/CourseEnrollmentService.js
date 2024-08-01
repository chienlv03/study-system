// import axios from "axios";

// const REST_API_BASE_URL = "http://localhost:8080/api/";


// export const enrollCourse = (userId, courseId, classCode) => axios.post(`${REST_API_BASE_URL}enroll/user/${userId}/course/${courseId}`, null, { params: { classCode } });

// export const updateScore = (enrollmentId, scores) => axios.put(`${REST_API_BASE_URL}update/${enrollmentId}/scores`, scores);

// export const getEnrollInCourse = (courseId, userId) => axios.get(`${REST_API_BASE_URL}get/courseEnrollment/course/${courseId}/user/${userId}`);

// export const getEnrollByUserId = (userId) => axios.get(`${REST_API_BASE_URL}get/courseEnrollments/user/${userId}`);

// export const getUserInCourse = (courseId) => axios.get(`${REST_API_BASE_URL}get/user/in/course/${courseId}`);

// export const getAllCourseTheUserParticipated = (userId) => axios.get(`${REST_API_BASE_URL}get/course/of/user/${userId}`);

// export const getAbsentInCourse = (courseId) => axios.get(`${REST_API_BASE_URL}get/absent/in/course/${courseId}`);

// export const removeUserFromCourse = (userId, courseId) => axios.delete(REST_API_BASE_URL + "remove/user/" + userId + "/course/" + courseId);

// export const getUserAndAttendInCourse = (courseId) => axios.get(`${REST_API_BASE_URL}get/user/attendance/in/course/${courseId}`);

import api from "../AxiosConfig";

const COURSE_API_BASE_URL = "http://localhost:8080/api/";

export const enrollCourse = (userId, courseId, classCode) => api.post(`${COURSE_API_BASE_URL}enroll/user/${userId}/course/${courseId}`, null, { params: { classCode } });

export const updateScore = (enrollmentId, scores) => api.put(`${COURSE_API_BASE_URL}update/${enrollmentId}/scores`, scores);

export const getEnrollInCourse = (courseId, userId) => api.get(`${COURSE_API_BASE_URL}get/courseEnrollment/course/${courseId}/user/${userId}`);

export const getEnrollByUserId = (userId) => api.get(`${COURSE_API_BASE_URL}get/courseEnrollments/user/${userId}`);

export const getUserInCourse = (courseId) => api.get(`${COURSE_API_BASE_URL}get/user/in/course/${courseId}`);

export const getAllCourseTheUserParticipated = (userId) => api.get(`${COURSE_API_BASE_URL}get/course/of/user/${userId}`);

export const getAbsentInCourse = (courseId) => api.get(`${COURSE_API_BASE_URL}get/absent/in/course/${courseId}`);

export const removeUserFromCourse = (userId, courseId) => api.delete(COURSE_API_BASE_URL + "remove/user/" + userId + "/course/" + courseId);

export const getUserAndAttendInCourse = (courseId) => api.get(`${COURSE_API_BASE_URL}get/user/attendance/in/course/${courseId}`);

export const getGradeInCourse = (courseId) => api.get(`${COURSE_API_BASE_URL}get/grade/in/course/${courseId}`);