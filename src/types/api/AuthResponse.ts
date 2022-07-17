export interface AuthResponse {
  message: string;
  user: {
    token: string;
    data: {
      id: number;
      name: string;
      email: string;
    };
  };
  errors: [];
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthErrors {
  errors: AuthError[];
}
export interface AuthError {
  rule: string;
  field: string;
  message: string;
}
