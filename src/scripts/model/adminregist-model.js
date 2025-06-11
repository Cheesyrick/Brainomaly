// Path: src/scripts/model/admin-register-model.js (atau sesuaikan)

const ADMIN_API_ENDPOINT = "https://brainomaly-api-v1.up.railway.app/register";
const ADMIN_SECRET_PASSWORD = "APHRODITE";

const AdminRegisterModel = {
  async registerAdmin({
    name,
    email,
    password,
    role,
    birthPlace,
    birthDate,
    gender,
    secretPasswordProvided,
  }) {
    if (secretPasswordProvided !== ADMIN_SECRET_PASSWORD) {
      throw new Error("Password rahasia admin salah.");
    }

    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !birthPlace ||
      !birthDate ||
      !gender
    ) {
      throw new Error(
        "Semua field (nama, email, password, role, tempat lahir, tanggal lahir, jenis kelamin) harus diisi."
      );
    }
    if (password.length < 6) {
      throw new Error("Password minimal harus 6 karakter.");
    }

    const response = await fetch(ADMIN_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role, // Role sekarang diambil dari input
        birthPlace,
        birthDate,
        gender,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
          `Registrasi admin gagal dengan status: ${response.status}`
      );
    }

    return result;
  },
};

export default AdminRegisterModel;
