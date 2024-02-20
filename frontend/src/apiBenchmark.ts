import axios, { AxiosResponse } from "axios";

export const benchmark = axios.create({
  baseURL: "http://localhost:3000",
});

benchmark.interceptors.response.use((response: AxiosResponse) => {
  return response;
  // },
  // (error) => {
  //   if (error.response.status == 401) {
  //     window.location.replace("Alerta_Cheias/frontend/pages/login/login.html");
  //   }
  //   return error;
});
