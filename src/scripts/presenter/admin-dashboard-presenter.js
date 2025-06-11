// src/scripts/presenters/admin-dashboard-presente  r.js

import AdminDashboardModel from "../model/admin-dashboard-model";

const AdminDashboardPresenter = {
  view: null,

  init(view) {
    // Validasi view untuk memastikan memiliki metode yang diperlukan
    if (
      !view ||
      typeof view.showLoading !== "function" ||
      typeof view.hideLoading !== "function" ||
      typeof view.updateDashboardCards !== "function" ||
      typeof view.showError !== "function"
    ) {
      throw new Error(
        "View yang diteruskan ke AdminDashboardPresenter tidak valid atau tidak memiliki metode yang diperlukan."
      );
    }

    this.view = view;
    this.loadDashboardStats();
  },

  async loadDashboardStats() {
    if (!this.view) return;

    this.view.showLoading(); // Menampilkan indikator loading
    try {
      const stats = await AdminDashboardModel.getDashboardStats();
      this.view.updateDashboardCards(stats.totalPatients, stats.totalHistory); // Memperbarui data dashboard
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
      if (
        error.message === "NOT_LOGGED_IN" ||
        error.message === "TOKEN_EXPIRED"
      ) {
        alert(
          "Sesi Anda tidak valid atau telah berakhir. Silakan login kembali."
        );
        localStorage.removeItem("user_token");
        window.location.hash = "#/login"; // Redirect ke halaman login
      } else {
        this.view.showError(error.message); // Menampilkan pesan error di view
      }
    } finally {
      this.view.hideLoading(); // Menyembunyikan indikator loading
    }
  },
};

export default AdminDashboardPresenter;
