import RegisterPresenter from "../../presenter/regist-Presenter";

const RegisterPageSimplified = {
  async render() {
    return `

      <div class="register-page-container">
        <link rel="stylesheet" href="styles-regist.css"> 

        <div class="register-card">
          
          <div class="register-title-section">
            <h1>Daftar Akun Baru</h1>
            <p class="prompt">Isi data diri Anda untuk melanjutkan.</p>
          </div>

          <form id="register-form">
            <input type="hidden" id="role" name="role" value="user" />

            <div>
              <label for="name" class="form-label">Nama Lengkap</label>
              <input type="text" id="name" name="name" required placeholder="Masukkan nama lengkap Anda" class="form-input" />
            </div>

            <div>
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" required placeholder="contoh@email.com" class="form-input" />
            </div>

            <div>
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" name="password" required minlength="6" placeholder="Minimal 6 karakter" class="form-input" />
              <p class="input-description">Minimal 6 karakter.</p>
            </div>

            <div>
              <label for="birthPlace" class="form-label">Tempat Lahir</label>
              <input type="text" id="birthPlace" name="birthPlace" required placeholder="Kota kelahiran" class="form-input" />
            </div>

            <div>
              <label for="birthDate" class="form-label">Tanggal Lahir</label>
              <input type="date" id="birthDate" name="birthDate" required class="form-input" />
            </div>

            <div>
              <label for="gender" class="form-label">Jenis Kelamin</label>
              <select id="gender" name="gender" required class="form-select">
                <option value="">Pilih Jenis Kelamin</option>
                <option value="male">Male</option> 
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div id="message-container">
            </div>

            <button type="submit" id="register-button">
              DAFTAR
            </button>
          </form>

          <p class="login-link-section">
            Sudah punya akun? 
            <a href="#/login">Masuk di sini</a>
          </p>
        </div>
      </div>
      <style>
  body,
  html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  .register-page-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  .register-card {
    background-color: #ffffff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-radius: 0.75rem;
    padding: 2rem;
    width: 100%;
    max-width: 28rem;
  }
  .register-title-section {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .register-title-section h1 {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: #0369a1;
    margin-bottom: 0.25rem;
  }
  .register-title-section .prompt {
    color: #4b5563;
    font-size: 0.875rem;
  }
  #register-form {
    display: flex;
    flex-direction: column;
  }
  #register-form > div:not(#message-container) {
    margin-bottom: 0.75rem;
  }
  .form-label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  .form-input,
  .form-select {
    width: 100%;
    padding: 0.65rem 0.9rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    font-size: 0.875rem;
  }
  .form-input:focus,
  .form-select:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 2px #0ea5e9, inset 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  .input-description {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }
  #message-container {
    text-align: center;
    color: #ef4444;
    font-size: 0.875rem;
    min-height: 1.25rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  #register-button {
    width: 100%;
    background-color: #0284c7;
    color: #ffffff;
    font-weight: 600;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.5rem;
  }
  #register-button:hover {
    background-color: #0369a1;
  }
  #register-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.5);
  }
  #register-button:disabled,
  #register-button.processing {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .login-link-section {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: #4b5563;
  }
  .login-link-section a {
    font-weight: 500;
    color: #0284c7;
    text-decoration: none;
  }
  .login-link-section a:hover {
    text-decoration: underline;
    color: #0369a1;
  }
</style>`;
  },

  async afterRender() {
    const form = document.getElementById("register-form");
    const messageContainer = document.getElementById("message-container");
    const registerButton = document.getElementById("register-button");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const roleInput = document.getElementById("role");
    const birthPlaceInput = document.getElementById("birthPlace");
    const birthDateInput = document.getElementById("birthDate");
    const genderInput = document.getElementById("gender");

    if (
      !form ||
      !messageContainer ||
      !registerButton ||
      !nameInput ||
      !emailInput ||
      !passwordInput ||
      !roleInput ||
      !birthPlaceInput ||
      !birthDateInput ||
      !genderInput
    ) {
      console.error("Satu atau lebih elemen form registrasi tidak ditemukan.");
      if (messageContainer)
        messageContainer.innerHTML =
          "<p>Kesalahan: Elemen form tidak ditemukan.</p>";
      return;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      messageContainer.innerHTML = "";
      registerButton.disabled = true;
      registerButton.textContent = "MEMPROSES...";
      registerButton.classList.add("processing");

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const role = roleInput.value;
      const birthPlace = birthPlaceInput.value.trim();
      const birthDate = birthDateInput.value;
      const gender = genderInput.value;

      if (
        !name ||
        !email ||
        !password ||
        !role ||
        !birthPlace ||
        !birthDate ||
        !gender
      ) {
        messageContainer.innerHTML =
          "<p>Semua field harus diisi dengan benar.</p>";
        registerButton.disabled = false;
        registerButton.textContent = "DAFTAR";
        registerButton.classList.remove("processing");
        return;
      }

      try {
        const result = await RegisterPresenter.register({
          name,
          email,
          password,
          role,
          birthPlace,
          birthDate,
          gender,
        });

        if (result.success) {
          messageContainer.innerHTML = `<p style="color: green;">${result.message}</p>`;
          form.reset();
          if (document.getElementById("role")) {
            document.getElementById("role").value = "user";
          }
          registerButton.textContent = "DAFTAR";
          registerButton.disabled = false;
          registerButton.classList.remove("processing");

          setTimeout(() => {
            window.location.hash = "/login";
          }, 1500);
        } else {
          messageContainer.innerHTML = `<p>${result.message}</p>`;
          registerButton.disabled = false;
          registerButton.textContent = "DAFTAR";
          registerButton.classList.remove("processing");
        }
      } catch (error) {
        console.error("Error tak terduga selama proses registrasi:", error);
        messageContainer.innerHTML = `<p>Terjadi kesalahan tak terduga. Silakan coba lagi.</p>`;
        registerButton.disabled = false;
        registerButton.textContent = "DAFTAR";
        registerButton.classList.remove("processing");
      }
    });
  },
};

export default RegisterPageSimplified;
