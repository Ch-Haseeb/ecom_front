import axios from "axios";
const baseURL = process.env.VUE_APP_BACKEND_APP_API_URL;

const authApi = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function registerUser(userData) {
  return authApi.post("/register", userData);
}

export function loginUser(userData) {
  return authApi.post("/login", userData);
}
