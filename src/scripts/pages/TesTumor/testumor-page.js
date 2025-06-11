// src/scripts/pages/Testumor/testumor-page.js

import TestumorPresenter from "../../presenter/testumor-Presenter";
import "../../../styles/analyze-style.css";
const TestumorPage = {
  async render() {
    return `
      <div class="analyze-container">
        <div class="analyze-card">
          <h1 class="analyze-title">Brain Tumor Detector</h1>
          <form id="analyze-form">
            <div id="image-upload-area" class="upload-area">
              <div id="preview-container" class="preview-container" style="display: none;">
                <img id="image-preview" src="#" alt="Image Preview" />
                <button type="button" id="remove-image-btn" class="remove-image-btn">&times;</button>
              </div>
              <div id="upload-prompt" class="upload-prompt">
                <i class="bi bi-cloud-arrow-up-fill upload-icon"></i>
                <p>Drag & Drop Gambar di Sini</p>
                <p class="separator">atau</p>
                <label for="file-input" class="browse-label">Cari Gambar</label>
                <input type="file" id="file-input" accept="image/jpeg, image/png, image/jpg" style="display: none;">
              </div>
            </div>
            <div id="message-container" class="message-container"></div>
            <button id="predict-button" type="submit" class="analyze-button predict-button" disabled>PREDICT</button>
            <div class="or-divider">ATAU COBA DENGAN</div>
            <a href="data/sample-data.zip" download="sample-images.zip" class="analyze-button sample-button">SAMPLE DATA</a>
          </form>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const token = localStorage.getItem("user_token");
    if (!token) {
      alert("Anda harus login untuk melakukan analisis.");
      window.location.hash = "#/login";
      return;
    }
    TestumorPresenter.init(this);
  },

  getFileInput() {
    return document.querySelector("#file-input");
  },
  getForm() {
    return document.querySelector("#analyze-form");
  },
  setupEventListeners(
    fileChangeHandler,
    dropHandler,
    dragOverHandler,
    dragLeaveHandler,
    removeImageHandler
  ) {
    const uploadArea = document.querySelector("#image-upload-area");
    const fileInput = this.getFileInput();
    uploadArea.addEventListener("dragover", dragOverHandler);
    uploadArea.addEventListener("dragleave", dragLeaveHandler);
    uploadArea.addEventListener("drop", dropHandler);
    fileInput.addEventListener("change", fileChangeHandler);
    document
      .querySelector("#remove-image-btn")
      .addEventListener("click", removeImageHandler);
  },
  showImagePreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.querySelector("#image-preview").src = e.target.result;
      document.querySelector("#preview-container").style.display = "block";
      document.querySelector("#upload-prompt").style.display = "none";
      document.querySelector("#predict-button").disabled = false;
    };
    reader.readAsDataURL(file);
  },
  hideImagePreview() {
    document.querySelector("#image-preview").src = "#";
    document.querySelector("#preview-container").style.display = "none";
    document.querySelector("#upload-prompt").style.display = "block";
    document.querySelector("#predict-button").disabled = true;
    this.getForm().reset();
  },
  setDragState(active = false) {
    const uploadArea = document.querySelector("#image-upload-area");
    if (active) {
      uploadArea.classList.add("dragging");
    } else {
      uploadArea.classList.remove("dragging");
    }
  },
  showMessage(message, isError = false) {
    const container = document.querySelector("#message-container");
    container.textContent = message;
    container.className = `message-container ${isError ? "error" : "success"}`;
  },
  showLoading(isPredicting) {
    const button = document.querySelector("#predict-button");
    if (isPredicting) {
      button.disabled = true;
      button.textContent = "MENGANALISIS...";
    } else {
      button.disabled = false;
      button.textContent = "PREDICT";
    }
  },
};

export default TestumorPage;
