import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPages from "./pages/Auth";
import ProfilePage from "./pages/ProfilePage";
import Appbar from "./components/Appbar";
import BackgroundWrapper from "./components/BackgroundWrapper";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider, useAuth } from "./context/AuthContext";

import "./App.css";

const AppRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BackgroundWrapper>
      <Appbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" /> : <AuthPages />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BackgroundWrapper>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />ß
      </Router>
    </AuthProvider>
  );
};

export default App;
