// src/scripts/models/testumor-model.js
import { getBaseUrl } from "../utils/api-admin-helper";

// Helper untuk fetch dengan token user
async function fetchWithUserAuth(url, options = {}) {
  const token = localStorage.getItem("user_token");
  if (!token) throw new Error("NOT_LOGGED_IN");

  const headers =
    options.body instanceof FormData
      ? { Authorization: `Bearer ${token}` }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(
      errorData.message || `Request failed with status ${response.status}`
    );
  }
  return response.json();
}

const TestumorModel = {
  /**
   * Fungsi ini HANYA melakukan prediksi dan mengembalikan hasilnya.
   */
  async predict(imageFile) {
    const PREDICTION_ENDPOINT = "https://brain-tumor-api.up.railway.app/predict";

    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(PREDICTION_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const err = await response
        .json()
        .catch(() => ({ detail: "Gagal melakukan prediksi." }));
      throw new Error(err.detail);
    }

    const prediction = await response.json();

    // Mengubah format hasil agar seragam
    return {
      result: prediction.label,
      score: prediction.confidence * 100,
      notes: `Model mendeteksi kelas '${
        prediction.label
      }' dengan tingkat kepercayaan ${(prediction.confidence * 100).toFixed(
        2
      )}%.`,
    };
  },

  /**
   * Fungsi ini HANYA untuk menyimpan hasil ke riwayat.
   */
  async saveToHistory(imageFile, predictionResult) {
    const HISTORY_ENDPOINT = `${getBaseUrl()}/user/history`;

    const formData = new FormData();
    formData.append("photo", imageFile);
    formData.append("result", predictionResult.result);
    formData.append("score", predictionResult.score);
    formData.append("notes", predictionResult.notes);

    return fetchWithUserAuth(HISTORY_ENDPOINT, {
      method: "POST",
      body: formData,
    });
  },
};

export default TestumorModel;
