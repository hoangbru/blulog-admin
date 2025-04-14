import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

import { refreshAccessToken } from "./utils";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        setAccessToken(newToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// api.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem("BLA_ACT");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const status = error.response?.status || 500;
//     const defaultMessage = "An unexpected error occurred.";

//     if (error.response?.status === 401) {
//       try {
//         const newToken = await refreshAccessToken();

//         if (newToken) {
//           sessionStorage.setItem("BLA_ACT", newToken);
//           // Update the default Authorization header
//           api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
//           // Retry the original request with new token
//           error.config.headers.Authorization = `Bearer ${newToken}`;
//           return axios(error.config);
//         }
//       } catch (refreshError) {
//         console.error("Failed to refresh access token:", refreshError);
//         // Optionally handle logout or redirect to login page here
//       }
//     }

//     return Promise.reject({
//       success: false,
//       message: error.response?.data?.meta?.message || defaultMessage,
//       status,
//     });
//   }
// );

export default axiosInstance;
