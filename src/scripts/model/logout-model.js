const LogoutPresenter = {
  async logout() {
    try {
      window.location.hash = "/login";
      alert("Anda telah berhasil logout.");
    } catch (error) {
      alert("Terjadi kesalahan saat logout.");
    }
  },
};

export default LogoutPresenter;
