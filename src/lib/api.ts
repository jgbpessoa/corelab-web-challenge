import axios from "axios";
import { toast } from "react-toastify";
import { resolveTypeReferenceDirective } from "typescript";
import { RegisterData } from "../types/RegisterData";
import { LoginData } from "../types/LoginData";

const API_URL = "http://localhost:3333/api";

export const registerUser = async (registerData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, registerData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response;
  } catch (error: any) {
    toast.error("User already exists");
  }
};

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response;
  } catch (error: any) {
    toast.error("You have entered an invalid username or password");
  }
};

// const endpoint = (path: string): string => API + path;

// const get = async (path: string): Promise<any> => {
//   return fetch(endpoint(path)).then((res) => res.json());
// };

// export const getVehicles = async () => {
//   return get("/vehicles");
// };
