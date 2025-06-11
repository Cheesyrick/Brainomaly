const Register = {
  async registerUser({
    name,
    email,
    password,
    role,
    birthPlace,
    birthDate,
    gender,
  }) {
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
        "Semua field (nama, email, password, tanggal lahir, jenis kelamin) harus diisi."
      );
    }

    const response = await fetch(
      "https://brainomaly-api-v1.up.railway.app/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          birthPlace,
          birthDate,
          gender,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      // Throw an error with the message from the API if available, otherwise a generic one
      throw new Error(
        result.message || `Registrasi gagal dengan status: ${response.status}`
      );
    }

    return result; // Contains success message or user data from backend
  },
};

export default Register;
