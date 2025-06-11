import LoginPresenter from "../../presenter/login-presenter";

const LoginPageSimplified = {
  async render() {
    return `
      <link rel="stylesheet" href="styles-login.css"> 
      <div class="login-page-container">
        <div class="login-card">
          
          <div class="login-title-section">
            <h1>Brainomaly</h1>
            <p class="prompt">Login untuk melanjutkan</p>
          </div>

          <form id="login-form">
            <div>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="Email atau Username"
                class="form-input" 
              />
            </div>

            <div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                placeholder="Password"
                class="form-input" 
              />
            </div>
            
            <div id="message-container">
            </div>

            <button 
              type="submit" 
              id="login-button">
              LOGIN
            </button>
          </form>

          <p class="create-account-link-section">
            Belum punya akun? 
            <a href="#/regist">Buat Akun</a>
          </p>
        </div>
      </div>`;
  },

  async afterRender() {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const messageContainer = document.getElementById("message-container");
    const loginButton = document.getElementById("login-button");

    if (
      !loginForm ||
      !emailInput ||
      !passwordInput ||
      !messageContainer ||
      !loginButton
    ) {
      console.error("Satu atau lebih elemen form login tidak ditemukan.");
      if (messageContainer)
        messageContainer.innerHTML =
          "<p>Kesalahan: Elemen form tidak ditemukan.</p>";
      return;
    }

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      messageContainer.innerHTML = "";
      loginButton.disabled = true;
      loginButton.textContent = "MEMPROSES...";
      loginButton.classList.add("processing");

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        messageContainer.innerHTML = `<p>Email dan password harus diisi.</p>`;
        loginButton.disabled = false;
        loginButton.textContent = "LOGIN";
        loginButton.classList.remove("processing");
        return;
      }

      try {
        await LoginPresenter.handleLogin({
          email,
          password,
          onSuccess: () => {
            // Callback sukses sekarang HANYA mereset UI, tidak melakukan redirect.
            loginButton.textContent = "LOGIN";
            loginButton.disabled = false;
            loginButton.classList.remove("processing");
            // window.location.hash = "#/"; <-- BARIS INI SUDAH DIHAPUS
          },
          onError: (errorMessage) => {
            messageContainer.innerHTML = `<p>${errorMessage}</p>`;
            loginButton.disabled = false;
            loginButton.textContent = "LOGIN";
            loginButton.classList.remove("processing");
          },
        });
      } catch (error) {
        console.error("Error tak terduga selama proses login:", error);
        messageContainer.innerHTML = `<p>Terjadi kesalahan tak terduga. Silakan coba lagi.</p>`;
        loginButton.disabled = false;
        loginButton.textContent = "LOGIN";
        loginButton.classList.remove("processing");
      }
    });
  },
};

export default LoginPageSimplified;
