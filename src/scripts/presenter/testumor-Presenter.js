// src/scripts/presenters/testumor-presenter.js
import TestumorModel from "../../scripts/model/testumor-model";

const TestumorPresenter = {
  view: null,
  file: null,

  init(view) {
    this.view = view;
    // ... (sisa kode init tidak berubah)
    this.view.setupEventListeners(
      this.handleFileChange.bind(this),
      this.handleFileDrop.bind(this),
      (e) => {
        e.preventDefault();
        this.view.setDragState(true);
      },
      () => {
        this.view.setDragState(false);
      },
      this.handleRemoveImage.bind(this)
    );
    this.view
      .getForm()
      .addEventListener("submit", this.handleFormSubmit.bind(this));
  },

  // ... (handleFileChange, handleFileDrop, handleRemoveImage tidak berubah) ...
  handleFileChange(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.view.showImagePreview(this.file);
    }
  },
  handleFileDrop(event) {
    event.preventDefault();
    this.view.setDragState(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.view.getFileInput().files = files;
      this.view.showImagePreview(this.file);
    }
  },
  handleRemoveImage() {
    this.file = null;
    this.view.hideImagePreview();
  },

  async handleFormSubmit(event) {
    event.preventDefault();
    if (!this.file) {
      this.view.showMessage("Silakan pilih gambar terlebih dahulu.", true);
      return;
    }
    this.view.showLoading(true);
    this.view.showMessage("");

    try {
      // Langkah 1: Panggil Model untuk prediksi
      const predictionResult = await TestumorModel.predict(this.file);

      // Langkah 2: Panggil Model untuk menyimpan hasil ke riwayat
      await TestumorModel.saveToHistory(this.file, predictionResult);

      // Langkah 3: Beri notifikasi dan langsung kembali ke homepage
      alert("Analisis berhasil dan sudah tersimpan di riwayat Anda!");
      window.location.hash = "#/";
    } catch (error) {
      console.error("Analysis Error:", error);
      this.view.showMessage(`Analisis gagal: ${error.message}`, true);
    } finally {
      this.view.showLoading(false);
    }
  },
};

export default TestumorPresenter;
