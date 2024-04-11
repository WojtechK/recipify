import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useAuth = () => {
  const signUp = async <T>(formData: T) => {
    return await axios.post("/api/sign-up", formData);
  };

  return {
    signUp,
  };
};
