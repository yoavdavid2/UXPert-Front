import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import AuthPages from "./pages/Auth";
import { TOKEN_LS } from "./config";
import ProfilePage from "./pages/ProfilePage";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
  //const isAuthenticated = localStorage.getItem(TOKEN_LS) !== null;

  //if (!isAuthenticated) {
  //  return <Navigate to="/Auth" />; 
 // }

  return <>{children}</>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPages />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        {/* Make sure route matches exactly how it's being accessed */}
        <Route 
          path="/ProfilePage" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        {/* Also provide lowercase version for consistency */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        {/* Fallback redirects to auth page 
       <Route path="*" element={<Navigate to="/auth" />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
