import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useAuth = () => {
  const signUp = async <T>(formData: T): Promise<AxiosResponse> => {
    return await axios.post<T>("/api/sign-up", formData);
  };

  const login = async <T>(formData: T): Promise<AxiosResponse> => {
    return await axios.post("/api/login", formData, {
      withCredentials: true,
    });
  };

  return {
    signUp,
    login,
  };
};
