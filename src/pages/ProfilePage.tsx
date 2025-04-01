import React, { useState, useEffect } from "react";
import {
  Typography,
  Avatar,
  Container,
  Grid,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { getUserProfile, getFullName, UserProfile } from "../types/UserProfile";
import "./pages.css";
import { Project, mockProjects } from "../types/Project";
import ProjectCard from "../components/ProjectCard";
import { projectService } from "../services/projectService";
//import { reportService, reportToProject, ReportHistoryQuery } from '../services/reportService';

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //pagination state
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const limit = 10;
  useEffect(() => {
    const profile = getUserProfile();
    setUserProfile(profile);

    if (!profile) {
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

    fetchProjects();
  }, []);

  useEffect(() => {
    if (userProfile) {
      fetchProjects();
    }
  }, [page]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch projects from API with pagination parameters
      const result = await projectService.getProjects({
        page: page,
        limit: limit,
        sort: "desc", // newest first
      });

      setProjects(result.projects);
      setTotalProjects(result.total);
      setTotalPages(Math.ceil(result.total / limit));
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to load projects. Please try again later.");
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await projectService.deleteProject(projectId);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
      setError("Failed to delete the project. Please try again.");
    }
  };

  const handleCreateProject = () => {
    console.log("Create new project clicked");
  };

  if (!userProfile) {
    return (
      <div className="page-layout">
        <Container className="loading-container">
          <Typography variant="h5" sx={{ color: "white" }}>
            Loading profile...
          </Typography>
        </Container>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <Container className="profile-container">
        <div className="profile-header">
          <div className="profile-header-content">
            <Avatar
              src={userProfile.profileImage || undefined}
              alt={getFullName(userProfile)}
              className="profile-avatar"
            />
            <div className="profile-info">
              <Typography variant="h4" component="h1" className="profile-name">
                {getFullName(userProfile)}
              </Typography>
              <Typography variant="body1" className="profile-email">
                {userProfile.email}
              </Typography>
              <Typography variant="body2" className="profile-member-since">
                Member since{" "}
                {userProfile.createdAt
                  ? new Date(userProfile.createdAt).toLocaleDateString()
                  : "Unknown date"}
              </Typography>
            </div>
          </div>
          <div className="profile-actions">
            <Button variant="contained" className="profile-edit-button">
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="projects-section">
          <div className="projects-header">
            <Typography variant="h5" component="h2" className="section-title">
              My Projects
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="new-project-button"
              onClick={handleCreateProject}
            >
              New Project
            </Button>
          </div>
          {loading && (
            <div className="loading-projects">
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Loading projects...
              </Typography>
            </div>
          )}
          {error && (
            <div className="error-message">
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            </div>
          )}

          {!loading && projects.length > 0 && (
            <>
              <Grid container spacing={6} className="projects-grid">
                {projects.map((project) => (
                  <Grid item xs={12} sm={6} key={project.id}>
                    <ProjectCard
                      project={project}
                      onDelete={() => handleDeleteProject(project.id)}
                    />
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <div
                  className="pagination-container"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(event, newPage) => setPage(newPage)}
                    color="primary"
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Showing {projects.length} of {totalProjects} projects
                  </Typography>
                </div>
              )}
            </>
          )}

          {!loading && projects.length === 0 && (
            <div className="empty-projects">
              <Typography variant="body1">
                You don't have any projects yet. Create your first project!
              </Typography>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
