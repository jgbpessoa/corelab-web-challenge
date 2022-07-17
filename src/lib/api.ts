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
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData: LoginInterface) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchVehicles = async () => {
  try {
    const response = await axios.get(`${API_URL}/vehicles`);
    return response;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const searchAndFilter = async (terms: TermsInterface) => {
  const response = await axios.get(`${API_URL}/vehicles`, { params: terms });

  return response;
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

export const deleteVehicle = async (token: string, id: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    await axios.delete(`${API_URL}/vehicles/${id}`, config);
  } catch (error: any) {
    toast.error("Delete failed! Try again later");
  }
};

export const updateVehicle = async (
  id: number,
  vehicleData: VehicleInterface,
  token: string
) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.patch(
      `${API_URL}/vehicles/${id}`,
      vehicleData,
      config
    );

    toast.success("Vehicle successfully updated!");
    return response;
  } catch (error) {
    toast.error("Error while trying to update your car. Try again later");
    console.log(error);
  }
};

export const fetchFavorites = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(
      `${API_URL}/vehicles/favorites/data`,
      config
    );
    return response;
  } catch (error) {
    toast.error("Error while loading favorites! Try again later");
    console.log(error);
  }
};

export const addFavorite = async (token: string, vehicleId: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.post(
      `${API_URL}/vehicles/favorites`,
      { id: vehicleId },
      config
    );

    toast.success("Vehicle successfully added as favorite!");
    return response;
  } catch (error) {
    toast.error("Error! Try again later");
    console.log(error);
  }
};

export const deleteFavorite = async (token: string, vehicleId: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.delete(
      `${API_URL}/vehicles/favorites/${vehicleId}`,
      config
    );

    toast.success("Vehicle successfully removed from favorites!");
    return response;
  } catch (error) {
    toast.error("Error! Try again later");
    console.log(error);
  }
};
