import { useState, useEffect } from "react";
import { CircularProgress, Container, Typography, Box } from "@mui/material";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileDashboard from "../components/profile/ProfileDashboard";
import { UserProfile, getUserProfile } from "../types/UserProfile";
import { ProjectDto } from "../utils/types";


import "./pages.css";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectDto | null>(null);

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

  //const handleEditProfile = () => {
  //  console.log("Edit profile clicked");
  //};

  if (isProfileLoading) {
    return (
      <Box className="profile-dashboard-layout">
        <Container className="loading-container">
          <Typography variant="h4" sx={{ color: "black" }}>
            Loading profile...
          </Typography>
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  if (!userProfile) {
    return (
      <Box className="profile-dashboard-layout">
        <Container className="error-container">
          <Typography variant="h5" sx={{ color: "white" }}>
            {error || "Unable to load profile. Please try again."}
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="profile-dashboard-layout">
      <ProfileSidebar 
        userProfile={userProfile}
        selectedProject={selectedProject}
        onProjectSelect={setSelectedProject}
      />

      <ProfileDashboard
        userId={userProfile.id}
        selectedProject={selectedProject}
        setGlobalError={setError}
      />
    </Box>
  );
};

export default ProfilePage;
