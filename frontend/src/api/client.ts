//frontend/src/api/client.ts
const BASE_URL = "http://localhost:5000/api";

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición al servidor");
  }

  return data;
};
