import axios from "axios";
import { toast } from "react-toastify";
import { RegisterInterface } from "../types/RegisterInterface";
import { LoginInterface } from "../types/LoginInterface";
import { TermsInterface } from "../types/TermsInterface";
import { VehicleInterface } from "../types/VehicleInterface";

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

export const createVehicle = async (
  vehicleData: VehicleInterface,
  token: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.post(
      `${API_URL}/vehicles`,
      vehicleData,
      config
    );

    toast.success("Vehicle successfully added!");
    return response;
  } catch (error) {
    toast.error("Error while trying to add your car. Try again later");
    console.log(error);
  }
};

export const fetchFilterValues = async (property: string) => {
  try {
    const response = await axios.get(`${API_URL}/vehicles`, {
      params: { property },
    });
    return response.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
