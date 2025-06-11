const BASE_URL = "https://brainomaly-api-v1.up.railway.app";

export async function fetchWithAdminAuth(url, options = {}) {
  const token = localStorage.getItem("user_token");
  if (!token) {
    console.error("User token not found in localStorage.");
    throw new Error("NOT_LOGGED_IN");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem("user_token");
    throw new Error("TOKEN_EXPIRED");
  }

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${
        errorData.message || "Unknown error"
      }`
    );
  }

  return response.json();
}

export function getBaseUrl() {
  return BASE_URL;
}
