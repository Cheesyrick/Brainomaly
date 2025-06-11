import HomePresenter from "../../presenter/home-Presenter.js";

const HomePage = {
  async render() {
    return `
      <link rel="stylesheet" href="styles-home.css"> 
      <section class="home-page container mx-auto p-4">
      <div class="page-header-card">
      <div>
        <h1 class="header-card-title">Riwayat Pemeriksaan</h1>
        <p class="header-card-subtitle">Semua hasil analisa Anda yang tersimpan.</p>
      </div>
      <a href="#/Testumor" class="cta-button">
        <i class="bi bi-plus-lg"></i> Analisa Baru
      </a>
    </div>
        <div id="message-container" class="message mb-4"></div> 
        <div id="loading-indicator" class="text-center mb-4" style="display: none;">Memuat riwayat...</div>
        <div id="history-list" class="history-list">

      </section>
    `;
  },

  async afterRender() {
    const token = localStorage.getItem("user_token"); // Ambil token dari local storage

    if (!token) {
      console.log("Token tidak ditemukan, redirecting to login.");
      window.location.hash = "#/login"; // Redirect ke halaman login jika token tidak ada
      return;
    }

    try {
      // Decode token untuk mendapatkan informasi peran pengguna
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode payload dari JWT
      const role = payload.role; // Asumsikan payload memiliki properti 'role'

      if (role === "admin") {
        console.log("User role is 'admin', redirecting to admin dashboard.");
        window.location.hash = "#/admin";
        return;
      }

      // Jika role adalah user, tetap di homepage
      console.log("User role is 'user', staying on homepage.");
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("user_token"); // Hapus token jika terjadi kesalahan
      window.location.hash = "#/login";
      return;
    }

    HomePresenter.init(this);
    await HomePresenter.loadUserHistory();
  },

  showMessage(messageText, isError = true) {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      const messageClass = isError ? "text-red-500" : "text-green-500";
      messageContainer.innerHTML = `<p class="${messageClass}">${messageText}</p>`;
    } else {
      console.error("Message container not found");
    }
  },

  showLoading() {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "block";
    }
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.innerHTML = "";
    }
  },

  hideLoading() {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }
  },

  showUserHistory(historyItems) {
    const container = document.getElementById("history-list");
    if (!container) {
      console.error("History list container not found");
      return;
    }

    if (!historyItems || historyItems.length === 0) {
      this.showEmptyHistory();
      return;
    }

    const historyHtml = historyItems
      .map((item) => {
        if (
          !item ||
          typeof item.result === "undefined" ||
          typeof item.score === "undefined" ||
          !item.date
        ) {
          console.warn(
            "Invalid history item structure (missing core fields):",
            item
          );
          return `<article class="history-item bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-start"><div class="history-item-content flex-grow"><p class="text-red-500">Data riwayat tidak lengkap.</p></div></article>`;
        }

        let formattedDate = "Tanggal tidak valid";
        try {
          formattedDate = new Date(item.date).toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } catch (e) {
          console.error("Error formatting date:", item.date, e);
        }

        let resultColorClass = "text-gray-700";
        let resultBadgeClass = "bg-gray-200 text-gray-800"; // Default

        if (item.result) {
          switch (item.result.toLowerCase()) {
            case "no tumor":
              resultColorClass = "text-green-700";
              resultBadgeClass = "bg-green-200 text-gray-800";
              break;
            case "glioma":
              resultColorClass = "text-red-700";
              resultBadgeClass = "bg-red-200 text-gray-800";
              break;
            case "meningioma":
              resultColorClass = "text-yellow-700";
              resultBadgeClass = "bg-yellow-200 text-gray-800";
              break;
            case "pituitary":
              resultColorClass = "text-purple-700";
              resultBadgeClass = "bg-purple-200 text-gray-800";
              break;
            default:
              resultBadgeClass = "bg-gray-200 text-gray-800";
              break;
          }
        }

        let notesElement = "";
        if (item.notes && item.notes.trim() !== "") {
          notesElement = `<p class="history-item-notes text-sm text-gray-600 mt-2"><strong>Catatan:</strong> ${item.notes}</p>`;
        } else {
          notesElement = `<p class="history-item-notes text-sm text-gray-600 mt-2"><em>Tidak ada catatan.</em></p>`;
        }

        return `
        <article class="history-item bg-white shadow-md rounded-lg p-4 mb-4">
          <div class="history-item-content flex-grow">
            <div class="history-item-header mb-2">
              <h3 class="history-item-result text-2xl font-semibold ${resultColorClass}">
              Hasil:
              <span class="badge ${resultBadgeClass} px-5 py-1 text-sm font-medium rounded-full">
                ${item.result || "N/A"}
              </span>
              </h3>
              <p class="history-item-score text-blue-600 text-sm">Akurasi: ${
                typeof item.score === "number"
                  ? item.score.toFixed(2)
                  : item.score || "N/A"
              }%</p>
            </div>
            ${notesElement}
            <small class="history-item-date text-xs text-gray-500 mt-2 block">Tanggal: ${formattedDate}</small>
          </div>
        </article>
      `;
      })
      .join("");

    container.innerHTML = historyHtml;
  },

  showEmptyHistory() {
    const container = document.getElementById("history-list");
    if (container) {
      container.innerHTML = `<p class="text-center text-gray-500 py-8">Belum ada riwayat pemeriksaan.</p>`;
    }
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.innerHTML = "";
    }
  },
};

export default HomePage;
