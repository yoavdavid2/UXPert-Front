import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
