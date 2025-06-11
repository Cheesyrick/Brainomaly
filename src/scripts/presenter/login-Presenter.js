// src/scripts/presenters/login-presenter.js

import Auth from "../model/login-model";

const LoginPresenter = {
  async handleLogin({ email, password, onSuccess, onError }) {
    try {
      // responseData sekarang akan berisi objek: { token: "...", user: { role: "...", ... } }
      const responseData = await Auth.login(email, password);

      // Ekstrak token dan role dari struktur respons yang benar
      const token = responseData.token;
      const role = responseData.user ? responseData.user.role : undefined;

      if (token && role) {
        // Simpan token di localStorage
        localStorage.setItem("user_token", token);

        // Simpan role hanya jika admin
        if (role === "admin") {
          localStorage.setItem("user_role", "admin");
        } else {
          localStorage.removeItem("user_role"); // Bersihkan jika bukan admin
        }

        // Redirect berdasarkan role
        if (role === "admin") {
          window.location.hash = "#/admin"; // Redirect ke dashboard admin
        } else {
          window.location.hash = "#/"; // Redirect ke homepage user biasa
        }

        onSuccess(); // Callback sukses
      } else {
        throw new Error("Token atau role tidak ditemukan dalam respons API.");
      }
    } catch (error) {
      console.error("[LoginPresenter] Error saat proses login:", error);
      onError(error.message);
    }
  },
};

export default LoginPresenter;
