import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Paper,
  Link,
  CircularProgress,
} from "@mui/material";

import { AuthPagesProps } from "../pages/Auth";
import { emailRegex, passwordLogInRegex } from "../utils/validations";
import { BACKEND_URL } from "../config";
import { useAuth } from "../utils/AuthContext";
import api from "../services/requestsWrapper";
import "./pages.css";

const SignIn = ({ onSwitchPage }: AuthPagesProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const isDisabled =
    !emailRegex.test(email) || !passwordLogInRegex.test(password) || isLoading;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post(
        `${BACKEND_URL}/auth/login`,
        {
          email: email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { token, user } = response.data;

      login(token, user);

      navigate("/");
    } catch (error) {
      interface ApiError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const apiError = error as ApiError;
      setError(apiError.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
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
            <Box component="form" onSubmit={handleSignIn}>
              <Typography
                variant="h4"
                className="auth-title"
                sx={{ marginBottom: 2 }}
              >
                Welcome Back
              </Typography>

              <TextField
                className="auth-input"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!email && !emailRegex.test(email)}
                helperText={
                  !!email && !emailRegex.test(email)
                    ? "Please enter a valid email address"
                    : ""
                }
              />

              <TextField
                className="auth-input"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!password && !passwordLogInRegex.test(password)}
                helperText={
                  !!password && !passwordLogInRegex.test(password)
                    ? "Password must be at least 8 characters"
                    : ""
                }
              />

              {error && (
                <Typography color="error" align="center">
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isDisabled}
                className="auth-button"
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="auth-switch-text">
                <Link
                  component="button"
                  className="auth-switch-link"
                  onClick={onSwitchPage}
                >
                  Don't have an account? Sign up
                </Link>
              </div>

              <div className="auth-divider" style={{ margin: "24px 0" }}>
                <span className="auth-divider-text">OR</span>
              </div>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleSignIn}
                className="auth-social-button"
              >
                Continue with Google
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
