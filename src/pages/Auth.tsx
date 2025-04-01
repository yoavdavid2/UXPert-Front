import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Box, Container, Paper } from "@mui/material";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export interface AuthPagesProps {
  onSwitchPage: () => void;
}

const Auth = () => {
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isSignedIn, setIsSignedIn] = useState(
    location?.state ? location.state == "login" : true
  );

  useEffect(() => {
    if (location?.state) {
      setIsSignedIn(location.state === "login");
    }
  }, [location.state]);

  const switchToSignIn = () => {
    setIsSignedIn(true);
    setError(null);
  };

  // Toggle to sign up mode
  const switchToSignUp = () => {
    setIsSignedIn(false);
    setError(null);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError(null);
    setIsLoading(false);
  };

  const handleSignUpSuccess = () => {
    resetForm();
    setIsSignedIn(true);
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
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                error={error}
                setError={setError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onSwitchToSignUp={switchToSignUp}
              />
            ) : (
              <SignupForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                error={error}
                setError={setError}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                onSignUpSuccess={handleSignUpSuccess}
                onSwitchToSignIn={switchToSignIn}
              />
            )}
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Auth;
