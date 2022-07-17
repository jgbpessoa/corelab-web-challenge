import { AuthResponse } from "../../types/api/AuthResponse";
import { AuthAction, AuthContextData } from "../../types/context/AuthContext";

const authReducer = (
  state: AuthContextData,
  action: AuthAction
): AuthContextData => {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
      };
    case "AUTH_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: (action.payload as AuthResponse).user.data,
        token: (action.payload as AuthResponse).user.token,
        isLoading: false,
        errorMessage: "",
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: (action.payload as AuthResponse).message,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: (action.payload as AuthResponse).errors,
      };
    case "LOGOUT":
      return {
        ...state,
        user: "",
        token: "",
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
