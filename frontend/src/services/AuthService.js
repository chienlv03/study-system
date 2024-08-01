// import axios from 'axios';

// const REST_API_BASE_URL = 'http://localhost:8080/api/auth/';

// export const signup = (user) => axios.post(REST_API_BASE_URL + 'signup', user);

// export const signin = (user) => axios.post(REST_API_BASE_URL + 'sign-in', user);

// export const signout = () => axios.post(REST_API_BASE_URL + 'sign-out');

// export const refreshToken = () => axios.post(REST_API_BASE_URL + 'refresh-token');

import api from '../AxiosConfig';

const AUTH_API_BASE_URL = "/auth/";

export const signup = (user) => api.post(AUTH_API_BASE_URL + 'signup', user);

export const signin = (user) => api.post(AUTH_API_BASE_URL + 'sign-in', user);

export const signout = () => api.post(AUTH_API_BASE_URL + 'sign-out');

export const refreshToken = () => api.post(AUTH_API_BASE_URL + 'refresh-token');

