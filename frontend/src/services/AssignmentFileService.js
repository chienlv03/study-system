import api from "../AxiosConfig";

const REST_API_BASE_URL = "/assignmentFile";

export const getFileByAssignment = (assignmentId) => api.get(REST_API_BASE_URL + "/by-assignment/" + assignmentId);

export const getFileByname= (fileName) => api.get(REST_API_BASE_URL + "/files/" + fileName);

