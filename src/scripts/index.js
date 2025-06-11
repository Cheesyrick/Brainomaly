import "../styles/styles-login.css";
import "../styles/styles-aRegist.css";
import "../styles/index.css";
import "../styles/styles-home.css";
import "../styles/styles-aRegist.css";

import App from "./pages/app";
import NotificationHelper from "./utils/notification-helper";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    sidebar: document.querySelector("#app-sidebar"),
  });

  document.querySelectorAll(".skip-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.focus();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      link.blur();
    });
  });

  const toggleBtn = document.querySelector("#globalNotificationToggle");
  if (toggleBtn) {
    const updateButtonText = () => {
      toggleBtn.textContent = NotificationHelper.isEnabled()
        ? "Nonaktifkan Notifikasi"
        : "Aktifkan Notifikasi";
    };

    toggleBtn.addEventListener("click", async () => {
      if (Notification.permission === "default") {
        const granted = await NotificationHelper.requestPermission();
        if (!granted) {
          alert("Izin notifikasi dibutuhkan untuk mengaktifkan fitur ini.");
          return;
        }
      } else {
        NotificationHelper.toggle();
      }

      updateButtonText();
    });

    updateButtonText();
  }

  await app.renderPage();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("SW registered:", reg))
        .catch((err) => console.error("SW failed:", err));
    });
  }

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
