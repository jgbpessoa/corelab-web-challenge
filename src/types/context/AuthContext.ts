import React from "react";
import { AuthResponse, User } from "../api/AuthResponse";

export interface AuthContextData {
  user: User | "";
  token: string;
  isLoading: boolean;
  errorMessage: string | [];
  dispatch?: React.Dispatch<AuthAction>;
}

export interface AuthAction {
  type: string;
  payload: AuthResponse;
}
