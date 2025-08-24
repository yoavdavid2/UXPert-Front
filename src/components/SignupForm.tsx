import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Link,
} from "@mui/material";

import { ISignupFormProps } from "../utils/types";
import { BACKEND_URL } from "../config";
import "./components.css";



const SignupForm = ({ onSwitchToSignIn }: ISignupFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <Box>
      <Typography variant="h4" className="auth-title" sx={{ mb: 2 }}>
        Create your account
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 4, color: '#666' }}>
        Join UXpert to analyze your website and get AI-powered insights
      </Typography>

      <Button
        fullWidth
        variant="contained"
        onClick={handleGoogleSignUp}
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
          "Sign up with Google"
        )}
      </Button>

      <div
        className="auth-switch-text"
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        <Link
          component="button"
          className="auth-switch-link"
          onClick={onSwitchToSignIn}
        >
          Already have an account? Sign in
        </Link>
      </div>

      <Typography variant="body2" align="center" sx={{ mt: 2, color: '#888' }}>
        By signing up, you agree to our Terms of Service and Privacy Policy
      </Typography>
    </Box>
  );
};

export default SignupForm;