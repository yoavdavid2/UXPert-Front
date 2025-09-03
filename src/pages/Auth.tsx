import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Box, Container, Paper } from "@mui/material";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Auth = () => {
  const location = useLocation();

  const [isSignedIn, setIsSignedIn] = useState(
    location?.state ? location.state === "login" : true
  );

  useEffect(() => {
    if (location?.state) {
      setIsSignedIn(location.state === "login");
    }
  }, [location.state]);

  const switchToSignIn = () => {
    setIsSignedIn(true);
  };

  const switchToSignUp = () => {
    setIsSignedIn(false);
  };

  return (
    <div className="page-layout">
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper elevation={3} className="auth-form-container">
            {isSignedIn ? (
              <LoginForm onSwitchToSignUp={switchToSignUp} />
            ) : (
              <SignupForm onSwitchToSignIn={switchToSignIn} />
            )}
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Auth;