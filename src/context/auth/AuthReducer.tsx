import { AuthAction, AuthContextData } from "../../types/context/AuthContext";

const authReducer = (
  state: AuthContextData,
  action: AuthAction
): AuthContextData => {
  switch (action.type) {
    case "REQUEST_AUTH":
      return {
        ...state,
        isLoading: true,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.data?.user,
        token: action.payload.data?.token.token,
        isLoading: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
    case "REGISTER_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.errors,
      };
    case "LOGOUT":
      return {
        ...state,
        user: "",
        token: "",
      };
    default:
      return state;
  }
};

export default authReducer;
