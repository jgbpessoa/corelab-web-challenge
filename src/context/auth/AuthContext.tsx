import React, { createContext, useReducer } from "react";
import { AuthContextData } from "../../types/context/AuthContext";
import authReducer from "./AuthReducer";

type Props = {
  children?: React.ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const userData = localStorage.getItem("user");

  const initialState: AuthContextData = {
    user: userData ? JSON.parse(userData).data.user : "",
    token: userData ? JSON.parse(userData).data.token.token : "",
    isLoading: false,
    errorMessage: "",
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
