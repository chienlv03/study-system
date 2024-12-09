import api from "../AxiosConfig";

const REST_API_BASE_URL = "/grade";

export const createGrade = (userId, courseId, grade) => api.post(REST_API_BASE_URL + "/user/" + userId + "/course/" + courseId, grade);

export const updateGrade = (gradeId, grade) => api.put(`${REST_API_BASE_URL}/${gradeId}`, grade);

export const getGradeByUserId = (userId) => api.get(`${REST_API_BASE_URL}/user/${userId}`);

export const getGradeByCourseId = (courseId) => api.get(`${REST_API_BASE_URL}/course/${courseId}`);