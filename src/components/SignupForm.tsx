import React, { useRef, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress,
  Link,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

import { ISignupFormProps } from "../utils/types";
import { emailRegex, passwordSignUpRegex } from "../utils/validations";
import { BACKEND_URL } from "../config";
import api from "../services/Api";

const SignupForm = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  setError,
  isLoading,
  setIsLoading,
  onSignUpSuccess,
  onSwitchToSignIn,
}: ISignupFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPasswordMatch = password === confirmPassword;

  const isDisabled =
    firstName === "" ||
    lastName === "" ||
    username === "" ||
    !emailRegex.test(email) ||
    !passwordSignUpRegex.test(password) ||
    !isPasswordMatch ||
    isLoading;

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

    setIsLoading(true);
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

      setFirstName("");
      setLastName("");
      setUsername("");
      setConfirmPassword("");
      setProfileImage(null);
      setImagePreview(null);

      onSignUpSuccess();
    } catch (error) {
      interface ApiError {
        response?: {
          data?: {
            message: string[];
          };
        };
      }
      const apiError = error as ApiError;
      setError(
        apiError.response?.data?.message.join(".\n") ||
          "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSignUp}>
      <Typography variant="h4" className="auth-title" sx={{ mb: 2 }}>
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
          <div className="profile-image-filename">{profileImage.name}</div>
        )}
      </div>

      <Grid container spacing={2} sx={{ mb: 2 }}>
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
        sx={{ mb: 2 }}
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
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!password && !passwordSignUpRegex.test(password)}
        helperText={
          !!password && !passwordSignUpRegex.test(password)
            ? "Password must be at least 8 characters and include both letters and numbers"
            : ""
        }
        sx={{ mb: 2 }}
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
          !!confirmPassword && !isPasswordMatch ? "Passwords do not match" : ""
        }
        sx={{ mb: 2 }}
      />

      {error && (
        <Typography
          color="error"
          align="center"
          sx={{ mb: 2, whiteSpace: "pre-line" }}
        >
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
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
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
    </Box>
  );
};

export default SignupForm;
