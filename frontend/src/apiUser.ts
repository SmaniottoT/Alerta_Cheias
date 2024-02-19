import axios, { AxiosResponse } from "axios";

export const user = axios.create({
  baseURL: "http://localhost:3000",
});

user.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      window.location.replace("/pages/login/login.html");
    }
    return error;
  }
);

export const validateAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.replace("/pages/login/login.html");
  } else {
    user.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};
