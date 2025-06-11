// src/scripts/presenters/medical-history-presenter.js

import MedicalHistoryModel from "../../scripts/model/medical-history-model.js";

console.log("MedicalHistoryPresenter module loaded");

const MedicalHistoryPresenter = {
  view: null,
  allHistories: [],
  processedPatients: [],

  init(view) {
    console.log("MedicalHistoryPresenter initialized");
    this.view = view;
    this.loadInitialPatientList();
  },

  async loadInitialPatientList() {
    if (!this.view) return;
    this.view.showLoading();
    try {
      this.allHistories = await MedicalHistoryModel.getAllHistories();
      this.processedPatients = this._processHistoriesToPatients(
        this.allHistories
      );
      this.view.renderPatientListPage(this.processedPatients);
    } catch (error) {
      this.view.showError(error.message);
    } finally {
      this.view.hideLoading();
    }
  },

  performSearch(searchTerm) {
    const lowerCaseTerm = searchTerm.toLowerCase().trim();
    if (!lowerCaseTerm) {
      this.view.renderPatientListPage(this.processedPatients);
      return;
    }
    const filteredPatients = this.processedPatients.filter((patient) => {
      const nameMatch = patient.name.toLowerCase().includes(lowerCaseTerm);
      const idMatch = patient.id.toLowerCase().includes(lowerCaseTerm);
      return nameMatch || idMatch;
    });
    this.view.renderPatientListPage(filteredPatients);
  },

  async showPatientDetail(userId) {
    this.view.showLoading();
    try {
      const patient = this.processedPatients.find((p) => p.id === userId);
      const histories = await MedicalHistoryModel.getHistoriesByUserId(userId);
      console.log("Histories received from API:", histories);
      if (histories.length > 0) {
        console.log("First item structure:", histories[0]);
      } else {
        console.log("No histories found for this user.");
      }
      this.view.renderPatientDetailView(patient, histories);
    } catch (error) {
      this.view.showError(error.message);
    } finally {
      this.view.hideLoading();
    }
  },

  async handleDeleteHistory(userId, historyId) {
    // PENAMBAHAN: Pemeriksaan keamanan untuk mencegah ID undefined sampai ke API
    if (!userId || !historyId || historyId === "undefined") {
      alert("Error: Gagal mendapatkan ID untuk dihapus.");
      console.error("Delete cancelled due to missing userId or historyId.", {
        userId,
        historyId,
      });
      return;
    }

    if (!confirm("Apakah Anda yakin ingin menghapus entri riwayat ini?"))
      return;

    this.view.showLoading();
    try {
      await MedicalHistoryModel.deleteHistory(userId, historyId);
      alert("Riwayat berhasil dihapus.");
      // Muat ulang detail pasien untuk melihat perubahannya
      this.showPatientDetail(userId);
    } catch (error) {
      this.view.showError(error.message);
    } finally {
      this.view.hideLoading();
    }
  },

  _processHistoriesToPatients(histories) {
    const patients = {};
    if (!Array.isArray(histories)) {
      console.error("Warning: _processHistoriesToPatients expects an array.");
      return [];
    }
    histories.forEach((history) => {
      if (history.userId && history.userId._id) {
        const user = history.userId;
        if (!patients[user._id]) {
          patients[user._id] = {
            id: user._id,
            name: user.name,
            email: user.email,
            historyCount: 0,
          };
        }
        patients[user._id].historyCount++;
      }
    });
    return Object.values(patients);
  },
};

export default MedicalHistoryPresenter;
