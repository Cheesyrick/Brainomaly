// src/scripts/models/admin-dashboard-model.js

import { fetchWithAdminAuth, getBaseUrl } from "../utils/api-admin-helper";

const AdminDashboardModel = {
  async getDashboardStats() {
    // Panggil API untuk mendapatkan semua histori
    const responseData = await fetchWithAdminAuth(
      `${getBaseUrl()}/admin/history`
    );

    // Proses data di sini sebelum mengembalikannya ke presenter
    if (
      responseData &&
      responseData.status === "success" &&
      responseData.data &&
      responseData.data.histories
    ) {
      const histories = responseData.data.histories;
      const totalHistory = histories.length;

      const uniqueUserIds = new Set();
      histories.forEach((history) => {
        if (history.userId && history.userId._id) {
          uniqueUserIds.add(history.userId._id);
        }
      });

      return {
        totalPatients: uniqueUserIds.size,
        totalHistory,
      };
    } else {
      throw new Error("Format respons API tidak valid.");
    }
  },
};

export default AdminDashboardModel;
