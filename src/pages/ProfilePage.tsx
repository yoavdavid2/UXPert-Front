import { useState, useEffect } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";

import ProfileHeader from "../components/ProfileHeader";
import ProfileProjects from "../components/ProfileProjects";
import { UserProfile, getUserProfile } from "../types/UserProfile";

import "./pages.css";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsProfileLoading(true);
      try {
        const profile = getUserProfile();

        if (profile) {
          setUserProfile(profile);
        } else {
          const mockProfile = {
            id: "1",
            firstName: "Ron",
            lastName: "Israeli",
            email: "ron@example.com",
            profileImage: null,
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem("userProfile", JSON.stringify(mockProfile));
          setUserProfile(mockProfile);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile information. Please try again.");
      } finally {
        setIsProfileLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
  };

  if (isProfileLoading) {
    return (
      <div className="page-layout">
        <Container className="loading-container">
          <Typography variant="h4" sx={{ color: "black" }}>
            Loading profile...
          </Typography>
          <CircularProgress />
        </Container>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="page-layout">
        <Container className="error-container">
          <Typography variant="h5" sx={{ color: "white" }}>
            {error || "Unable to load profile. Please try again."}
          </Typography>
        </Container>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <div className="profile-container">
        <ProfileHeader
          userProfile={userProfile}
          onEditProfile={handleEditProfile}
        />

        <ProfileProjects userId={userProfile.id} setGlobalError={setError} />
      </div>
    </div>
  );
};

export default ProfilePage;
