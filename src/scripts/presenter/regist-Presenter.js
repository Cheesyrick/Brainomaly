// regist-presenter.js
import Register from "../model/regist-model"; // Menggunakan model yang baru Anda berikan

const RegisterPresenter = {
  async register({
    name,
    email,
    password,
    role,
    birthPlace,
    birthDate,
    gender,
  }) {
    try {
      const result = await Register.registerUser({
        // Memanggil fungsi dari model yang baru
        name,
        email,
        password,
        role,
        birthPlace,
        birthDate,
        gender,
      });

      return {
        success: true,
        message: result.message || "Registrasi berhasil!",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Registrasi gagal. Silakan coba lagi.",
      };
    }
  },
};

export default RegisterPresenter;
