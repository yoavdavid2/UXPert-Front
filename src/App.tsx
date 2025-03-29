import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Appbar from "./components/Appbar";
import BackgroundWrapper from "./components/BackgroundWrapper";

import "./App.css";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Router>
      <BackgroundWrapper>
        <Appbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BackgroundWrapper>
    </Router>
  );
};

export default App;
