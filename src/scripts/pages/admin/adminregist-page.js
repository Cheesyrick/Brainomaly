// Path: src/scripts/view/pages/admin-register-page.js (atau sesuaikan)

import AdminRegisterPresenter from "../../presenter/adminregist-presenter";

const AdminRegisterPage = {
  async render() {
    return `
      <link rel="stylesheet" href="styles-aRegist.css"> 
      <div class="login-page-container"> 
        <div class="login-card">
          
          <div class="login-title-section">
            <h1>Registrasi Admin</h1>
            <p class="prompt">Buat akun admin baru</p>
          </div>

          <form id="admin-register-form">
            <div>
              <input 
                type="text" 
                id="admin-name" 
                name="adminName" 
                required 
                placeholder="Nama Lengkap Admin"
                class="form-input" 
              />
            </div>
            <div>
              <input 
                type="email" 
                id="admin-email" 
                name="adminEmail" 
                required 
                placeholder="Email Admin"
                class="form-input" 
              />
            </div>
            <div>
              <input 
                type="password" 
                id="admin-password" 
                name="adminPassword" 
                required 
                minlength="6"
                placeholder="Password (min. 6 karakter)"
                class="form-input" 
              />
            </div>
            <div>
              <input 
                type="password" 
                id="admin-confirm-password" 
                name="adminConfirmPassword" 
                required 
                placeholder="Konfirmasi Password"
                class="form-input" 
              />
            </div>
            <div>
              <input 
                type="text" 
                id="admin-birth-place" 
                name="adminBirthPlace" 
                required 
                placeholder="Tempat Lahir"
                class="form-input" 
              />
            </div>
            <div>
              <input 
                type="date" 
                id="admin-birth-date" 
                name="adminBirthDate" 
                required 
                placeholder="Tanggal Lahir"
                class="form-input" 
              />
            </div>
            <div>
              <select id="admin-gender" name="adminGender" required class="form-input">
                <option value="" disabled selected>Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <input 
                type="hidden"  
                id="admin-role" 
                name="adminRole" 
                value="admin" 
            </div>
            <div>
              <input 
                type="password" 
                id="admin-secret-password" 
                name="adminSecretPassword" 
                required 
                placeholder="Password Rahasia Admin"
                class="form-input" 
              />
            </div>
            
            <div id="admin-message-container" class="message-container-style">
            </div>

            <button 
              type="submit" 
              id="admin-register-button"
              class="button-style">
              REGISTRASI ADMIN
            </button>
          </form>

          <p class="create-account-link-section" style="text-align: center; margin-top: 1rem;">
            Sudah punya akun? 
            <a href="#/login">Login di sini</a>
          </p>
        </div>
      </div>
      <style>
        
      </style>
    `;
  },

  async afterRender() {
    const form = document.getElementById("admin-register-form");
    const nameInput = document.getElementById("admin-name");
    const emailInput = document.getElementById("admin-email");
    const passwordInput = document.getElementById("admin-password");
    const confirmPasswordInput = document.getElementById(
      "admin-confirm-password"
    );
    const birthPlaceInput = document.getElementById("admin-birth-place");
    const birthDateInput = document.getElementById("admin-birth-date");
    const genderInput = document.getElementById("admin-gender");
    const roleInput = document.getElementById("admin-role");
    const secretPasswordInput = document.getElementById(
      "admin-secret-password"
    );
    const messageContainer = document.getElementById("admin-message-container");
    const registerButton = document.getElementById("admin-register-button");

    if (
      !form ||
      !nameInput ||
      !emailInput ||
      !passwordInput ||
      !confirmPasswordInput ||
      !birthPlaceInput ||
      !birthDateInput ||
      !genderInput ||
      !roleInput ||
      !secretPasswordInput ||
      !messageContainer ||
      !registerButton
    ) {
      console.error(
        "Satu atau lebih elemen form registrasi admin tidak ditemukan."
      );
      if (messageContainer)
        messageContainer.textContent = "Kesalahan: Elemen form tidak lengkap.";
      return;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      messageContainer.textContent = "";
      messageContainer.className = "message-container-style";
      registerButton.disabled = true;
      registerButton.textContent = "MEMPROSES...";

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const birthPlace = birthPlaceInput.value.trim();
      const birthDate = birthDateInput.value;
      const gender = genderInput.value;
      const role = roleInput.value.trim();
      const secretPasswordProvided = secretPasswordInput.value;

      if (password !== confirmPassword) {
        messageContainer.textContent =
          "Password dan konfirmasi password tidak cocok.";
        messageContainer.classList.add("message-error");
        registerButton.disabled = false;
        registerButton.textContent = "REGISTRASI ADMIN";
        return;
      }

      if (
        !name ||
        !email ||
        !password ||
        !birthPlace ||
        !birthDate ||
        !gender ||
        !role ||
        !secretPasswordProvided
      ) {
        messageContainer.textContent = "Semua field wajib diisi.";
        messageContainer.classList.add("message-error");
        registerButton.disabled = false;
        registerButton.textContent = "REGISTRASI ADMIN";
        return;
      }

      const result = await AdminRegisterPresenter.handleAdminRegistration({
        name,
        email,
        password,
        birthPlace,
        birthDate,
        gender,
        role,
        secretPasswordProvided,
      });

      if (result.success) {
        messageContainer.textContent =
          result.message + " Anda akan dialihkan ke halaman login.";
        messageContainer.classList.add("message-success");
        form.reset();
        roleInput.value = "admin";
        setTimeout(() => {
          window.location.hash = "#/login";
        }, 3000);
      } else {
        messageContainer.textContent = result.message;
        messageContainer.classList.add("message-error");
      }

      registerButton.disabled = false;
      registerButton.textContent = "REGISTRASI ADMIN";
    });
  },
};

export default AdminRegisterPage;
