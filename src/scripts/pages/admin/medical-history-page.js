// src/scripts/pages/admin/medical-history-page.js

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../../styles/dashboard-style.css";

import MedicalHistoryPresenter from "../../presenter/medical-history-presenter";
import { getBaseUrl } from "../../utils/api-admin-helper";

const MedicalHistoryPage = {
  async render() {
    return `
      <div class="container-fluid">
        <div class="row">
          <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div id="main-admin-content" class="pt-3"></div>
          </main>
        </div>
      </div>
    `;
  },

  async afterRender() {
    MedicalHistoryPresenter.init(this);
    this._setupEventListeners();
  },

  _setupEventListeners() {
    const mainContent = document.getElementById("main-admin-content");

    mainContent.addEventListener("click", (event) => {
      const detailButton = event.target.closest('button[data-action="detail"]');
      const deleteButton = event.target.closest('button[data-action="delete"]');
      const backButton = event.target.closest(
        'button[data-action="back-to-list"]'
      );

      if (detailButton) {
        MedicalHistoryPresenter.showPatientDetail(detailButton.dataset.userId);
      }

      if (backButton) {
        MedicalHistoryPresenter.loadInitialPatientList();
      }

      if (deleteButton) {
        MedicalHistoryPresenter.handleDeleteHistory(
          deleteButton.dataset.userId,
          deleteButton.dataset.historyId
        );
      }
    });

    mainContent.addEventListener("submit", (event) => {
      if (event.target.id === "search-patient-form") {
        event.preventDefault();
        const searchInput = document.getElementById("search-patient-input");
        MedicalHistoryPresenter.performSearch(searchInput.value);
      }
    });

    const logoutButton = document.getElementById("admin-logout-button-history");
    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Apakah Anda yakin ingin logout?")) {
          localStorage.removeItem("user_token");
          const mainAppSidebar = document.querySelector("#app-sidebar");
          const mainDrawerButton = document.querySelector("#drawer-button");
          if (mainAppSidebar) mainAppSidebar.style.display = "block";
          if (mainDrawerButton) mainDrawerButton.style.display = "block";
          window.location.hash = "#/login";
        }
      });
    }
  },

  renderPatientListPage(patients) {
    const mainContent = document.getElementById("main-admin-content");
    const patientListHtml =
      patients.length > 0
        ? patients
            .map(
              (patient) => `
        <div class="card mb-2">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 class="card-title mb-0">${patient.name}</h5>
              <small class="text-muted">ID: ${patient.id} | Total Riwayat: ${patient.historyCount}</small>
            </div>
            <button class="btn btn-sm btn-info" data-action="detail" data-user-id="${patient.id}">Lihat Detail Riwayat</button>
          </div>
        </div>
      `
            )
            .join("")
        : '<p class="text-muted text-center mt-3">Tidak ada data pasien ditemukan.</p>';

    mainContent.innerHTML = `
      <h4 class="mb-3 text-center">Medical History Data Pasien</h4>
      <div class="card">
        <div class="card-body">
          <form class="mb-4" id="search-patient-form">
            <div class="input-group">
              <input type="text" id="search-patient-input" class="form-control" placeholder="Cari Pasien (Nama atau ID)...">
              <button class="btn btn-primary" type="submit"><i class="bi bi-search"></i></button>
            </div>
          </form>
          <div id="loading-indicator" style="display: none; text-align: center; padding: 1rem;">Loading...</div>
          <div id="error-message-container"></div>
          <div id="patient-list-container">${patientListHtml}</div>
        </div>
      </div>
    `;
  },

  renderPatientDetailView(patient, histories) {
    const mainContent = document.getElementById("main-admin-content");
    const historiesHtml =
      histories.length > 0
        ? histories
            .map(
              (h) => `
        <div class="card mb-3">
          <div class="card-header d-flex justify-content-between">
            <span>Hasil: <strong>${h.result}</strong> (Skor: ${h.score.toFixed(
                2
              )}%)</span>
            <small>${new Date(h.date).toLocaleString("id-ID")}</small>
          </div>
          <div class="card-body">
            <p class="card-text">${h.notes || "<em>Tidak ada catatan.</em>"}</p>
          </div>
          <div class="card-footer">
            <button class="btn btn-sm btn-danger" data-action="delete" data-user-id="${
              h.userId?._id || patient.id
            }" data-history-id="${h.id}">Delete</button>
          </div>
        </div>
      `
            )
            .join("")
        : '<p class="text-muted">Pasien ini belum memiliki riwayat.</p>';

    mainContent.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="mb-0">Detail Riwayat untuk: ${patient.name}</h4>
        <button class="btn btn-outline-secondary btn-sm" data-action="back-to-list"><i class="bi bi-arrow-left"></i> Kembali ke Daftar</button>
      </div>
      <div id="loading-indicator" style="display: none; text-align: center; padding: 1rem;">Loading...</div>
      <div id="error-message-container"></div>
      ${historiesHtml}
    `;
  },

  showLoading() {
    const el = document.getElementById("loading-indicator");
    if (el) el.style.display = "block";
  },

  hideLoading() {
    const el = document.getElementById("loading-indicator");
    if (el) el.style.display = "none";
  },

  showError(message) {
    const el = document.getElementById("error-message-container");
    if (el) el.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  },
};

export default MedicalHistoryPage;
