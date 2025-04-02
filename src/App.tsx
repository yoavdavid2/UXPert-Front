import React, {useEffect} from "react";
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
import Appbar from "./components/Appbar";
import BackgroundWrapper from "./components/BackgroundWrapper";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider, decodeUserCookie, getCookie, mapToUserProfile, useAuth } from "./utils/AuthContext";

import "./App.css";
import ResultsPage from "./pages/Results";

const AppRouter = () => {
  const { isAuthenticated, isLoading, login } = useAuth();


  useEffect(() => {
    try {
      const decoded = decodeUserCookie()
      login(getCookie("access_token") as string, mapToUserProfile(decoded))
    } catch (exception) {
      console.log("local user")
    }
  }, [])

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

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