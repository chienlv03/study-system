// // import axios from "axios";
// import api from "../AxiosConfig";

// const REST_API_BASE_URL = "http://localhost:8080/api/attendance/";

// export const createAttendance = (courseId, attendance) => api.post(REST_API_BASE_URL + 'create/course/' + courseId, attendance);

// export const updateAttendance = (userId, courseId, attendance) => api.put(REST_API_BASE_URL + 'update/user/' + userId + '/course/' + courseId, attendance);

// export const getAttendanceTime = (courseId) => api.get(REST_API_BASE_URL + 'course/' + courseId + '/times');

import api from "../AxiosConfig";

const ATTENDANCE_API_BASE_URL = "http://localhost:8080/api/attendance/";

export const createAttendance = (courseId, attendance) => api.post(ATTENDANCE_API_BASE_URL + 'create/course/' + courseId, attendance);

export const updateAttendance = (userId, courseId, attendance) => api.put(ATTENDANCE_API_BASE_URL + 'update/user/' + userId + '/course/' + courseId, attendance);

export const getAttendanceTime = (courseId) => api.get(ATTENDANCE_API_BASE_URL + 'course/' + courseId + '/times');