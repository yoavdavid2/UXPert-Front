import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Appbar from "./components/Appbar";
import BackgroundWrapper from "./components/BackgroundWrapper";

import "./App.css";

const App = () => {
  const handleProfileClick = () => {
    console.log("Profile clicked");
    // Add your profile handling logic here
  };

  return (
    <Router>
      <BackgroundWrapper>
        <Appbar handleProfileClick={handleProfileClick} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BackgroundWrapper>
    </Router>
  );
};

export default App;
