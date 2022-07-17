import React, { createContext, useReducer } from "react";
import { AuthContextData } from "../../types/context/AuthContext";
import authReducer from "./AuthReducer";

type Props = {
  children?: React.ReactNode;
};

const userData = localStorage.getItem("user");

const initialState: AuthContextData = {
  user: userData ? JSON.parse(userData).user.data : "",
  token: userData ? JSON.parse(userData).user.token : "",
  isLoading: false,
  errorMessage: "",
};

const AuthContext = createContext<{
  state: AuthContextData;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
