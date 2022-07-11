import axios from "axios";
import { toast } from "react-toastify";
import { RegisterInterface } from "../types/RegisterInterface";
import { LoginInterface } from "../types/LoginInterface";
import { TermsInterface } from "../types/TermsInterface";

const API_URL = "http://localhost:3333/api";

export const registerUser = async (registerData: RegisterInterface) => {
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

export const loginUser = async (loginData: LoginInterface) => {
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

export const fetchVehicles = async () => {
  try {
    const response = await axios.get(`${API_URL}/vehicles`);
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const searchAndFilter = async (terms: TermsInterface) => {
  const response = await axios.get(`${API_URL}/vehicles`, { params: terms });

  return response.data;
};

// const endpoint = (path: string): string => API + path;

// const get = async (path: string): Promise<any> => {
//   return fetch(endpoint(path)).then((res) => res.json());
// };

// export const getVehicles = async () => {
//   return get("/vehicles");
// };
