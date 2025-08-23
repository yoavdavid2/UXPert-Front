import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Auth from "./pages/Auth";
import ProfilePage from "./pages/ProfilePage";
import Appbar from "./components/layout/Appbar";
import BackgroundWrapper from "./components/layout/BackgroundWrapper";
import ProtectedRoute from "./components/ProtectedRoute";
import Cookies from "js-cookie";

import {
  AuthProvider,
  decodeUserCookie,
  getCookie,
  mapToUserProfile,
  useAuth,
} from "./utils/AuthContext";

import "./App.css";
import ResultsPage from "./pages/Results";

const AppRouter = () => {
  const { isAuthenticated, isLoading, login } = useAuth();

  useEffect(() => {
    try {
      debugger;
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access_token");
      const userParam = params.get("user");

      if (accessToken) {
        Cookies.set("access_token", accessToken, { expires: 7 }); // expires in 7 days
      }

      if (userParam) {
        const userObj = JSON.parse(decodeURIComponent(userParam));
        Cookies.set("user", JSON.stringify(userObj), { expires: 7 });
      }
      


      const decoded = decodeUserCookie();
      login(getCookie("access_token") as string, mapToUserProfile(decoded));

      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (exception) {
      console.log("No user cookie found or invalid cookie", exception);
    }
  }, []);

  return (
    <BackgroundWrapper>
      <Appbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" /> : <Auth />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BackgroundWrapper>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
};

export default App;
