import api from "../AxiosConfig";

const REST_API_BASE_URL = "/submissionFiles";

export const getFileBySubmission = (submissionId) => api.get(REST_API_BASE_URL + "/by-submission/" + submissionId)