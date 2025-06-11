const NotificationHelper = {
  async requestPermission() {
    if ("Notification" in window) {
      const status = await Notification.requestPermission();
      const granted = status === "granted";
      localStorage.setItem(
        "push_notification",
        granted ? "enabled" : "disabled"
      );
      return granted;
    }
    return false;
  },

  isEnabled() {
    return localStorage.getItem("push_notification") === "enabled";
  },

  toggle() {
    const newState = this.isEnabled() ? "disabled" : "enabled";
    localStorage.setItem("push_notification", newState);
    return newState === "enabled";
  },

  showNotification(title, options = {}) {
    if ("Notification" in window && Notification.permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, options);
      });
    }
  },
};

export default NotificationHelper;
