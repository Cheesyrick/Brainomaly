import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../styles/dashboard-style.css";

import AdminDashboardPresenter from "../../presenter/admin-dashboard-presenter";

const AdminDashboardPage = {
  async render() {
    return `
      <div class="container-fluid">
        <div class="row">
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div id="main-admin-content" class="pt-3">
            </div>
          </main>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const mainAppHeader = document.querySelector("header:not(.navbar)");
    const mainAppFooter = document.querySelector("#footer-content");
    if (mainAppHeader) mainAppHeader.style.display = "none";
    if (mainAppFooter) mainAppFooter.style.display = "none";

    const token = localStorage.getItem("user_token");

    if (!token) {
      alert("Akses ditolak. Anda harus login sebagai admin.");
      window.location.hash = "#/login";
      return;
    }

    const mainAdminContent = document.getElementById("main-admin-content");
    if (mainAdminContent) {
      mainAdminContent.innerHTML = this._getDashboardOverviewHTML();
    }

    const view = {
      showLoading() {
        const loadingElement = document.getElementById("loading-indicator");
        if (loadingElement) {
          loadingElement.style.display = "block";
        }
      },
      hideLoading() {
        const loadingElement = document.getElementById("loading-indicator");
        if (loadingElement) {
          loadingElement.style.display = "none";
        }
      },
      updateDashboardCards(totalPatients, totalHistory) {
        const totalPatientsElement =
          document.getElementById("total-pasien-count");
        const historyPatientsElement = document.getElementById(
          "history-pasien-count"
        );

        if (totalPatientsElement) {
          totalPatientsElement.textContent = totalPatients;
        }
        if (historyPatientsElement) {
          historyPatientsElement.textContent = totalHistory;
        }
      },
      showError(message) {
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
          errorElement.textContent = message;
          errorElement.style.display = "block";
        }
      },
    };

    AdminDashboardPresenter.init(view);

    const logoutButton = document.getElementById("admin-logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Apakah Anda yakin ingin logout?")) {
          localStorage.removeItem("user_token");
          if (mainAppHeader) mainAppHeader.style.display = "flex";
          if (mainAppFooter) mainAppFooter.style.display = "block";
          window.location.hash = "#/login";
        }
      });
    }

    // Burger menu manual toggle
    const toggleButton = document.getElementById("menu-toggle-button");
    const sidebarMenu = document.getElementById("sidebarMenu");

    if (toggleButton && sidebarMenu) {
      toggleButton.addEventListener("click", () => {
        sidebarMenu.classList.toggle("show");
      });
    }
  },

  _getDashboardOverviewHTML() {
    return `
      <h4 class="mb-3 text-center">Dashboard Overview</h4>
      <p class="welcome-text">Selamat datang di Dashboard Admin Brainomaly.</p>
      <div class="row">
        <div class="col-md-6">
          <div class="dashboard-card card-total-pasien">
            <div class="card-icon"><i class="bi bi-people-fill"></i></div>
            <div class="card-content">
              <h5>Total Pasien Aktif (Dengan Riwayat)</h5>
              <p class="display-4" id="total-pasien-count">0</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="dashboard-card card-history-pasien">
            <div class="card-icon"><i class="bi bi-clock-history"></i></div>
            <div class="card-content">
              <h5>History Pasien (Jumlah Data)</h5>
              <p class="display-4" id="history-pasien-count">0</p>
            </div>
          </div>
        </div>
      </div>
      <div id="loading-indicator" style="display: none;">Loading...</div>
      <div id="error-message" style="display: none;" class="alert alert-danger"></div>
    `;
  },
};

export default AdminDashboardPage;
