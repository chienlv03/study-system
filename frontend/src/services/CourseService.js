// import axios from "axios";

// const REST_API_BASE_URL = "http://localhost:8080/api/course/";

// export const createCourse = (course, userId) => axios.post(REST_API_BASE_URL + 'create/' + userId, course);

// export const updateCourse = (course, courseId) => axios.put(REST_API_BASE_URL + 'update/' + courseId, course);

// export const getAllCourseByUser = (userId) => axios.get(REST_API_BASE_URL + 'get/by/user/' + userId);

// export const deleteCourse = (courseId) => axios.delete(REST_API_BASE_URL + 'remove/' + courseId)

import api from "../AxiosConfig";

const REST_API_BASE_URL = "/course/";

export const createCourse = (course, userId) => api.post(REST_API_BASE_URL + 'create/' + userId, course);

export const updateCourse = (course, courseId) => api.put(REST_API_BASE_URL + 'update/' + courseId, course);

export const getAllCourseByUser = (userId) => api.get(REST_API_BASE_URL + 'get/by/user/' + userId);

export const deleteCourse = (courseId) => api.delete(REST_API_BASE_URL + 'remove/' + courseId);
