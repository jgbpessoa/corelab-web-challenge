export interface AuthResponse {
  message: string;
  data: {
    token: {
      type: string;
      token: string;
    };
    user: {
      id: number;
      name: string;
      email: string;
      password: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  errors: [];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}
