import React, { useRef, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  Link,
  CircularProgress,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

import { AuthPagesProps, emailRegex, passwordSignUpRegex } from "./Auth";
import { BACKEND_URL } from "../config";
import api from "../services/Api";
import "./pages.css";

const SignUp = ({ onSwitchPage }: AuthPagesProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPasswordMatch = password === confirmPassword;

  const isDisabled =
    firstName === "" ||
    lastName === "" ||
    username === "" ||
    !emailRegex.test(email) ||
    !passwordSignUpRegex.test(password) ||
    !isPasswordMatch ||
    isUploading;

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.match("image.*")) {
        setError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Please select an image file smaller than 5MB");
        return;
      }

      setProfileImage(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);

      setError(null);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      await api.post(`${BACKEND_URL}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // On successful signup, switch to sign in page
      onSwitchPage();
    } catch (error) {
      interface ApiError {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const apiError = error as ApiError;
      setError(
        apiError.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
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
            <Box component="form" onSubmit={handleSignUp}>
              <Typography variant="h4" className="auth-title">
                Create your account
              </Typography>

              <div className="profile-image-container">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageSelect}
                  ref={fileInputRef}
                />

                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="profile-image profile-image-preview"
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    <span>?</span>
                  </div>
                )}

                <button
                  type="button"
                  className="profile-image-upload-button"
                  onClick={triggerFileInput}
                >
                  <PhotoCamera fontSize="small" />
                </button>

                {profileImage && (
                  <div className="profile-image-filename">
                    {profileImage.name}
                  </div>
                )}
              </div>

              <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="auth-input"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    className="auth-input"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>

              <TextField
                className="auth-input"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 1 }}
              />

              <TextField
                className="auth-input"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!email && !emailRegex.test(email)}
                helperText={
                  !!email && !emailRegex.test(email)
                    ? "Please enter a valid email address"
                    : ""
                }
                sx={{ mb: 1 }}
              />

              <TextField
                className="auth-input"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!password && !passwordSignUpRegex.test(password)}
                helperText={
                  !!password && !passwordSignUpRegex.test(password)
                    ? "Password must be at least 8 characters and include both letters and numbers"
                    : ""
                }
                sx={{ mb: 1 }}
              />

              <TextField
                className="auth-input"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!confirmPassword && !isPasswordMatch}
                helperText={
                  !!confirmPassword && !isPasswordMatch
                    ? "Passwords do not match"
                    : ""
                }
                sx={{ mb: 1 }}
              />

              {error && (
                <Typography color="error" align="center" sx={{ mt: 1, mb: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isDisabled}
                className="auth-button"
                sx={{ mt: 1, mb: 1 }}
              >
                {isUploading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign Up"
                )}
              </Button>

              <div className="auth-switch-text">
                <Link
                  component="button"
                  className="auth-switch-link"
                  onClick={onSwitchPage}
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;
