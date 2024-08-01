// import axios from "axios";

// const REST_API_BASE_URL = "http://localhost:8080/api/user/";

// export const getMyInfo = () => axios.get(REST_API_BASE_URL + 'my-info');

// export const updateUser = (user) => axios.put(REST_API_BASE_URL + 'update', user);

// export const searchUser = (keyword) => axios.get(REST_API_BASE_URL + 'search', { params: { keyword } });

// export const changePassword = (passwordChangeRequest) => axios.post(REST_API_BASE_URL + 'change-password', passwordChangeRequest);

import api from "../AxiosConfig";

const REST_API_BASE_URL = "http://localhost:8080/api/user/";

export const getMyInfo = () => api.get(REST_API_BASE_URL + 'my-info');

export const updateUser = (user) => api.put(REST_API_BASE_URL + 'update', user);

export const searchUser = (keyword) => api.get(REST_API_BASE_URL + 'search', { params: { keyword } });

export const changePassword = (passwordChangeRequest) => api.post(REST_API_BASE_URL + 'change-password', passwordChangeRequest);
