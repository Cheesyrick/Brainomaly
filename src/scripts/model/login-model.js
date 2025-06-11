// src/scripts/models/login-model.js

const Auth = {
  async login(email, password) {
    const response = await fetch(
      "https://brainomaly-api-v1.up.railway.app/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const result = await response.json();
    console.log("API Login Response:", JSON.stringify(result, null, 2));

    if (!response.ok) {
      const errorMessage = result.message || "Login gagal. Silakan coba lagi.";
      throw new Error(errorMessage);
    }

    if (result && result.data && result.data.token) {
      // Perubahan di sini: Kembalikan seluruh objek data
      return result.data; // <-- KEMBALIKAN SELURUH OBJEK { token, user }
    } else {
      throw new Error(
        "Format respons login tidak sesuai atau token tidak ditemukan."
      );
    }
  },
};

export default Auth;
