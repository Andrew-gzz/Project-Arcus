const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  type: "client" | "admin";
}

export interface AuthResponse {
  user: User;
  token: string;
}

const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ocurrió un error");
  }

  return data;
};

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  },

  async logout(): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return handleResponse(response);
  },

  async getProfile(): Promise<{ user: User }> {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    return handleResponse(response);
  },
};
