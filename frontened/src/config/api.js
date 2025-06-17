// Create a configuration file for API endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/v1/user/login`,
  LOGOUT: `${API_BASE_URL}/api/v1/user/logout`,
  REGISTER: `${API_BASE_URL}/api/v1/user/register`,
  GET_USERS: `${API_BASE_URL}/api/v1/user`,
  MESSAGES: (id) => `${API_BASE_URL}/api/v1/message/${id}`,
  SEND_MESSAGE: (id) => `${API_BASE_URL}/api/v1/message/send/${id}`,
};

export default API_ENDPOINTS;