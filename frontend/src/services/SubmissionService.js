import api from "../AxiosConfig";

const REST_API_BASE_URL = "/submission";

export const createSubmission = (submission, files) => {
    const formData = new FormData();
    formData.append('submission', JSON.stringify(submission));
    files.forEach((file) => {
        formData.append('files', file);
    });

    return api.post(REST_API_BASE_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateGradeAndFeedback = (submissionId, grade, feedback) => api.put(REST_API_BASE_URL +"/" + submissionId, { grade, feedback });

export const getSubmissionByAssignment = (assignmentId) => api.get(REST_API_BASE_URL + "/assignment/" + assignmentId)

export const getSubmissionByUserAndCourse = (userId, courseId) => api.get(REST_API_BASE_URL + "/user/" + userId + "/course/" + courseId)

export const checkIsSubmitted = (assignmentId, userId) => api.get(REST_API_BASE_URL + "/assignment/" + assignmentId + "/user/" + userId)

export const deleteSubmission = (submissionId, assignmentId) => api.delete(REST_API_BASE_URL + "/" + submissionId + "/assignment/" + assignmentId)