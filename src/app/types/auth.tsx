// types/auth.ts

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export interface LoginErrorResponse {
  error: string;
}
