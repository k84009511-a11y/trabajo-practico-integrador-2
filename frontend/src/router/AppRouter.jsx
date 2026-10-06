import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { CreateArticlePage } from "../pages/CreateArticlePage.jsx";
import { LoginPage } from "../pages/LoginPage.jsx";
import { RegisterPage } from "../pages/RegisterPage.jsx";
import { PrivateRoutes } from "./PrivateRoutes.jsx";
import { PublicRoutes } from "./PublicRoutes.jsx";

const PrivateLayout = () => (
  <PrivateRoutes>
    <Navbar />
    <HomePage />
  </PrivateRoutes>
);

const PrivateArticleLayout = () => (
  <PrivateRoutes>
    <Navbar />
    <CreateArticlePage />
  </PrivateRoutes>
);

const UnknownRoute = () => (
  <Navigate to={localStorage.getItem("isLogged") === "true" ? "/home" : "/login"} replace />
);

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UnknownRoute />} />
      <Route path="/login" element={<PublicRoutes><LoginPage /></PublicRoutes>} />
      <Route path="/register" element={<PublicRoutes><RegisterPage /></PublicRoutes>} />
      <Route path="/home" element={<PrivateLayout />} />
      <Route path="/articles/new" element={<PrivateArticleLayout />} />
      <Route path="*" element={<UnknownRoute />} />
    </Routes>
  </BrowserRouter>
);
