// Path: src/scripts/presenter/admin-register-presenter.js (atau sesuaikan)

import AdminRegisterModel from "../model/adminregist-model"; // Pastikan path ini benar

const AdminRegisterPresenter = {
  async handleAdminRegistration({
    name,
    email,
    password,
    role,
    birthPlace,
    birthDate,
    gender,
    secretPasswordProvided,
  }) {
    try {
      const result = await AdminRegisterModel.registerAdmin({
        name,
        email,
        password,
        role,
        birthPlace,
        birthDate,
        gender,
        secretPasswordProvided,
      });

      return {
        success: true,
        message: result.message || "Registrasi admin berhasil!",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Registrasi admin gagal. Silakan coba lagi.",
      };
    }
  },
};

export default AdminRegisterPresenter;
