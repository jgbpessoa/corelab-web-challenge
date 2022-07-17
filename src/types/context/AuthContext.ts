import React from "react";
import { AuthResponse, User } from "../api/AuthResponse";

export interface AuthContextData {
  user: User | "";
  token: string;
  isLoading: boolean;
  errorMessage: string | [];
}

export interface AuthAction {
  type: string;
  payload?: AuthResponse;
}
