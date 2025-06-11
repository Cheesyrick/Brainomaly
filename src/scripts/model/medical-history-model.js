// src/scripts/models/medical-history-model.js

import { fetchWithAdminAuth, getBaseUrl } from "../utils/api-admin-helper";

console.log("MedicalHistoryModel module loaded"); // Debugging log

const MedicalHistoryModel = {
  // Mengambil semua histori dari semua user
  async getAllHistories() {
    const responseData = await fetchWithAdminAuth(
      `${getBaseUrl()}/admin/history`
    );
    console.log("API response for all histories:", responseData); // Debugging log
    if (
      responseData &&
      responseData.status === "success" &&
      responseData.data &&
      responseData.data.histories
    ) {
      return responseData.data.histories;
    }
    throw new Error("Gagal mengambil data histori atau format tidak sesuai.");
  },

  // Mengambil semua histori dari satu user spesifik
  async getHistoriesByUserId(userId) {
    const responseData = await fetchWithAdminAuth(
      `https://brainomaly-api-v1.up.railway.app/admin/users/${userId}/history`
    );
    if (
      responseData &&
      responseData.status === "success" &&
      responseData.data &&
      responseData.data.histories
    ) {
      return responseData.data.histories;
    }
    throw new Error("Gagal mengambil detail histori pasien.");
  },

  // Mengupdate satu entri histori spesifik
  /*async updateHistory(userId, historyId, historyData) {
    // historyData adalah objek seperti { result, notes, score }
    return fetchWithAdminAuth(
      `https://brainomaly-api-v1.up.railway.app/admin/users/${userId}/history/${historyId}`,
      {
        method: "PUT",
        body: JSON.stringify(historyData),
      }
    );
  },*/

  // Menghapus satu entri histori spesifik
  async deleteHistory(userId, historyId) {
    return fetchWithAdminAuth(
      `${getBaseUrl()}/admin/users/${userId}/history/${historyId}`,
      {
        method: "DELETE",
      }
    );
  },
};

export default MedicalHistoryModel;
