import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth & multipart handling
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // Auto remove Content-Type for FormData (let browser handle it)
    if (
      config.data instanceof FormData ||
      (config.headers && config.headers["Content-Type"] === "multipart/form-data")
    ) {
      delete config.headers["Content-Type"];
    }

    // Attach token if available
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Central error handler
const handleAxiosError = (error) => {
  console.error("API Error:", error);

  if (error.code === "ECONNABORTED") {
    return {
      error: true,
      success: false,
      message: "Request timed out. Please try again later.",
      status: 408,
    };
  }

  return {
    error: true,
    success: false,
    message: error.response?.data?.message || error.message || "Request failed",
    status: error.response?.status || 500,
  };
};

//  Upload image(s)
export const uploadImages = async (url, data) => {
  try {
    const res = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Will be auto-removed by interceptor
      },
    });
    return res;
  } catch (error) {
    return handleAxiosError(error);
  }
};

// POST request
export const postData = async (url, data) => {
  try {
    const res = await axiosInstance.post(url, data);
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};

// GET request
export const fetchDataFromApi = async (url) => {
  try {
    const res = await axiosInstance.get(url);
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};

// PUT request
export const editData = async (url, updateData) => {
  try {
    const res = await axiosInstance.put(url, updateData);
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};

// DELETE request (used for removing image)
export const deleteData = async (url) => {
  try {
    const res = await axiosInstance.delete(url);
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deleteMultipleData = async (url, data = null) => {
  try {
    const res = await axiosInstance.request({
      url,
      method: 'DELETE',
      data: data || {},
    });
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};