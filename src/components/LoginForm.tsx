import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";

import { ILoginFormProps } from "../utils/types";
import { BACKEND_URL } from "../config";
import "./components.css";

const LoginForm = ({ onSwitchToSignUp }: ILoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <Box>
      <Typography variant="h4" className="auth-title" sx={{ marginBottom: 2 }}>
        Welcome Back
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 4, color: '#666' }}>
        Sign in to your account to continue
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="auth-social-button"
        sx={{ 
          mb: 3,
          py: 1.5,
          fontSize: '16px'
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Continue with Google"
        )}
      </Button>

      <div
        className="auth-switch-text"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        <Link
          component="button"
          className="auth-switch-link"
          onClick={onSwitchToSignUp}
        >
          Don't have an account? Sign up
        </Link>
      </div>
    </Box>
  );
};

export default LoginForm;