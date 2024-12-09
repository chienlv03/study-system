import api from "../AxiosConfig";

const REST_API_BASE_URL = "/assignment";

export const createAssignment = (assignment, files) => {
    const formData = new FormData();
    formData.append('assignment', JSON.stringify(assignment));
    files.forEach((file) => {
        formData.append('files', file);
    });

    return api.post(REST_API_BASE_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateDueDate = (assignmentId, dueDate) => api.put(REST_API_BASE_URL + '/' + assignmentId + '/due-date',  dueDate);

export const getAssignmentBycourseId = (courseId) => api.get(REST_API_BASE_URL + '/course/' + courseId);

export const deleteAssignment = (assignmentId) => api.delete(REST_API_BASE_URL + '/' + assignmentId);