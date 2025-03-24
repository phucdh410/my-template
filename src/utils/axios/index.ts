import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

axiosInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (errors) => {
    return errors;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (errors) => {
    return errors;
  }
);

export const setAuthToken = (token?: string) => {
  if (token)
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

export { axiosInstance };
