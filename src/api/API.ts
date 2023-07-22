import axios from "axios";
import { RenewToken, roleApiKey, roleType, SignOut } from "./SignIn";
import { getApiKey, getSessionToken, setToken } from "../utils/LocalStorage";

const api = axios.create({
  baseURL: "https://smartparkingoffice.ir",
});

const roleTypeApiKey = {
  system: "sysAdmin",
  parking: "parkingAdmin",
  user: "user",
};

api.interceptors.request.use(
  (config) => {
    const token = getSessionToken();
    const apiKey = getApiKey();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (apiKey) {
      config.headers["api-key"] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const apiKey = getApiKey() as keyof typeof roleTypeApiKey;
    if (error.response?.status === 400) {
      if (originalRequest._retry) {
        const logout = await SignOut(roleTypeApiKey[apiKey] as roleApiKey);
        if (logout.status === 200) {
          localStorage.clear();
          window.location.href = "/sign-in";
        }
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      try {
        const response = await RenewToken(roleTypeApiKey[apiKey] as roleType);
        setToken(response.headers["session_token"]);
        originalRequest.headers.Authorization = `Bearer ${response.headers["session_token"]}`;
        return api(originalRequest);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
);

export default api;
