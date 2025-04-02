import { useNavigate } from "react-router";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";

import { ILoginFormProps } from "../utils/types";
import { useAuth } from "../utils/AuthContext";
import { emailRegex, passwordLogInRegex } from "../utils/validations";

import { BACKEND_URL } from "../config";
import api from "../services/requestsWrapper";

import "./components.css";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  isLoading,
  setIsLoading,
  onSwitchToSignUp,
}: ILoginFormProps) => {
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
          email,
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
    <Box component="form" onSubmit={handleSignIn}>
      <Typography variant="h4" className="auth-title" sx={{ marginBottom: 2 }}>
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
        sx={{ mb: 2 }}
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
        sx={{ mb: 2 }}
      />

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isDisabled}
        className="auth-button"
        sx={{ mb: 2 }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
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
  );
};

export default LoginForm;
