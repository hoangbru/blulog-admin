import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import axiosInstance from "./axios";
import { APIErrorResponse } from "@/types/errors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const handleApiError = (error: unknown) => {
  if (isAxiosError<APIErrorResponse>(error)) {
    const message = error.response?.data?.meta?.message || "Lỗi không xác định";
    toast.error(message);
    throw new Error(message);
  } else {
    toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
    throw new Error("Unexpected error");
  }
};

const request = async (
  path: string,
  method: Method = "GET",
  data?: Record<string, unknown>
) => {
  const config = {
    url: path,
    method,
    ...(method !== "GET" && { data }),
  };

  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetcher = (path: string) => request(path);

export const mutation = (
  path: string,
  method: Method = "POST",
  data?: Record<string, unknown>
) => request(path, method, data);

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const { data } = await axiosInstance.post(
      "/api/refresh-token",
      {},
      { withCredentials: true }
    );

    if (!data?.data?.accessToken) {
      throw new Error("No access token received");
    }

    return data.data.accessToken;
  } catch {
    console.error("Session expired. Redirecting to login...");
    return null;
  }
};
