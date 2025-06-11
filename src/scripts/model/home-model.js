const UserHistoryModel = {
  async fetchAll() {
    const token = localStorage.getItem("user_token");
    if (!token) {
      console.warn("User token not found in localStorage.");
      throw new Error("NOT_LOGGED_IN");
    }

    try {
      const response = await fetch(
        "https://brainomaly-api-v1.up.railway.app/user/history",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("API Response Status (User History):", response.status);

      if (response.status === 401) {
        throw new Error("TOKEN_EXPIRED");
      }

      if (!response.ok) {
        let errorMessage = `Gagal mengambil riwayat pengguna. Status: ${response.status}`;
        try {
          const errorResult = await response.json();
          errorMessage = errorResult.message || errorMessage;
        } catch (e) {
          // Biarkan pesan error default
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("API Response JSON (User History):", result);

      // --- LOGIKA BARU BERDASARKAN STRUKTUR API ---
      // 1. Cek apakah struktur yang benar ada: result.data.histories
      if (result && result.data && Array.isArray(result.data.histories)) {
        // Alamat dasar dari API untuk melengkapi URL gambar
        const API_BASE_URL = "https://brainomaly-api-v1.up.railway.app";

        const histories = result.data.histories;

        return histories.map((item) => ({
          ...item,
          photoUrl: item.imageUrl ? `${API_BASE_URL}${item.imageUrl}` : null,
        }));
      }

      console.warn(
        "Struktur respons API tidak terduga atau data kosong, mengembalikan array kosong:",
        result
      );
      return []; // Kembalikan array kosong jika struktur tidak cocok
    } catch (error) {
      console.error("Terjadi kesalahan pada saat fetch history:", error);
      throw error;
    }
  },
};

export default UserHistoryModel;
