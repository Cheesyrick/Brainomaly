console.log("Routes module loaded"); // Debugging log

import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import LoginPage from "../pages/login/login-page";
import RegistPage from "../pages/register/regist-page";
import AdminPage from "../pages/admin/admin-dashboard-page";
import AdminRegist from "../pages/admin/adminregist-page";
import MedicalHistoryPage from "../pages/admin/medical-history-page";
import TestumorPage from "../pages/TesTumor/testumor-page";

const routes = {
  "/": HomePage,
  "/about": new AboutPage(),
  "/login": LoginPage,
  "/regist": RegistPage,
  "/admin": AdminPage,
  "/aRegist": AdminRegist,
  "/aHistory": MedicalHistoryPage,
  "/Testumor": TestumorPage,
};

export default routes;
