import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Include Bearer token and auto-handle multipart/form-data
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (
      config.data instanceof FormData ||
      (config.headers && config.headers["Content-Type"] === "multipart/form-data")
    ) {
      delete config.headers["Content-Type"];
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🟦 Reusable error handler
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

// ✅ Upload array of images
export const uploadImages = async (url, imagesArray) => {
  try {
    const formData = new FormData();
    imagesArray.forEach((img, index) => {
      formData.append("images", img);
    });

    const res = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};

// ✅ POST request
export const postData = async (url, data) => {
  try {
    const res = await axiosInstance.post(url, data);
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};

// ✅ GET request
export const fetchDataFromApi = async (url) => {
  try {
    const res = await axiosInstance.get(url);
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};

// ✅ PUT/UPDATE request
export const editData = async (url, updateData) => {
  try {
    const res = await axiosInstance.put(url, updateData);
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};

// ✅ Optional DELETE
export const deleteData = async (url) => {
  try {
    const res = await axiosInstance.delete(url);
    return res.data || {};
  } catch (error) {
    return handleAxiosError(error);
  }
};
