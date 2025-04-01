import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPages from "./pages/Auth";
import ProfilePage from "./pages/ProfilePage";
import Appbar from "./components/Appbar";
import BackgroundWrapper from "./components/BackgroundWrapper";
import ProtectedRoute from "./components/ProtectedRoute";
        
import { AuthProvider, useAuth } from "./context/AuthContext";

import "./App.css";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <AuthProvider>
      <Router>
        <BackgroundWrapper>
          <Appbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={isAuthenticated ? <Navigate to="/" /> : <AuthPages />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" 
              element = {
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BackgroundWrapper>
      </Router>
    </AuthProvider>
  );
};

export default App;
