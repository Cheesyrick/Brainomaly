// File: app.js (Final dengan Logika Login)

import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";

class App {
  #sidebar = null;
  #content = null;
  #drawerButton = null;

  constructor({ sidebar, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#sidebar = sidebar;

    this._setupDrawer();
    this.#updateNavLinksVisibility(); // Panggil fungsi ini saat aplikasi dimulai
  }

  // ===== FUNGSI BARU UNTUK MENGELOLA TAMPILAN MENU =====
  #updateNavLinksVisibility() {
    const token = localStorage.getItem("user_token");
    const role = localStorage.getItem("user_role");

    const guestLinks = document.querySelectorAll('[data-nav="guest"]');
    const authLinks = document.querySelectorAll('[data-nav="auth"]');
    const adminLinks = document.querySelectorAll('[data-nav="admin"]');
    const userLinks = document.querySelectorAll('[data-nav="user"]');

    if (token) {
      // Tampilkan navigasi login
      userLinks.forEach((link) => (link.style.display = "none"));
      guestLinks.forEach((link) => (link.style.display = "none"));
      authLinks.forEach((link) => (link.style.display = "list-item"));

      // Jika role admin, tampilkan juga menu admin
      if (role === "admin") {
        userLinks.forEach((link) => (link.style.display = "none"));
        adminLinks.forEach((link) => (link.style.display = "list-item"));
      } else {
        adminLinks.forEach((link) => (link.style.display = "none"));
        userLinks.forEach((link) => (link.style.display = "list-item"));
      }
    } else {
      // Belum login
      userLinks.forEach((link) => (link.style.display = "none"));
      guestLinks.forEach((link) => (link.style.display = "list-item"));
      authLinks.forEach((link) => (link.style.display = "none"));
      adminLinks.forEach((link) => (link.style.display = "none"));
    }
  }

  _setupDrawer() {
    if (this.#drawerButton && this.#sidebar) {
      this.#drawerButton.addEventListener("click", () => {
        this.#sidebar.classList.toggle("is-open");
      });

      document.body.addEventListener("click", (event) => {
        if (
          !this.#sidebar.contains(event.target) &&
          !this.#drawerButton.contains(event.target)
        ) {
          this.#sidebar.classList.remove("is-open");
        }
      });

      // ===== LOGIKA BARU UNTUK TOMBOL LOGOUT =====
      const logoutButton = document.getElementById("logoutButton");
      if (logoutButton) {
        logoutButton.addEventListener("click", (event) => {
          event.preventDefault(); // Mencegah pindah halaman via hash

          // Hapus token dari localStorage
          localStorage.removeItem("user_token");
          localStorage.removeItem("user_role");

          // Perbarui tampilan menu navigasi
          this.#updateNavLinksVisibility();

          // Arahkan pengguna ke halaman login
          window.location.hash = "#/login";

          // Tutup sidebar jika terbuka (di mobile)
          this.#sidebar.classList.remove("is-open");
        });
      }

      this.#sidebar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          // Jangan tutup sidebar jika yang diklik adalah tombol logout,
          // karena logout sudah punya logika sendiri
          if (link.id !== "logoutButton") {
            this.#sidebar.classList.remove("is-open");
          }
        });
      });
    }
  }

  async renderPage() {
    if (this.#sidebar) {
      this.#sidebar.classList.remove("is-open");
    }

    // Setiap kali render halaman, kita cek ulang visibilitas link
    // Ini berguna jika user login/logout di tab lain
    this.#updateNavLinksVisibility();

    const url = getActiveRoute();
    const page = routes[url];
    if (!document.startViewTransition) {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
      return;
    }
    const transition = document.startViewTransition(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    });
  }
}

export default App;
