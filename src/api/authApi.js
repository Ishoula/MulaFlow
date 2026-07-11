import axios from "./axios";

export const loginUser = async (credentials) => {
  return axios.post("/auth/login", credentials);
};

export const registerUser = async (data) => {
  return axios.post("/auth/register", data);
};

export const verifyEmail = async (token) => {
  return axios.get(`/verify?token=${encodeURIComponent(token)}`);
};
