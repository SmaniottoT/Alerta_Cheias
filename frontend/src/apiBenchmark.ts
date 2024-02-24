import axios, { AxiosResponse } from "axios";

export const benchmark = axios.create({
  baseURL: "http://localhost:3000",
});

benchmark.interceptors.response.use((response: AxiosResponse) => {
  return response;
});
