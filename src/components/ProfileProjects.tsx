import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Grid,
  CircularProgress,
  Pagination,
} from "@mui/material";
import ProjectCard from "../components/ProjectCard";

import { IProfileProjectsSectionProps } from "../utils/types";
import { Project, mockProjects } from "../types/Project";
import { projectService } from "../services/projectService";

import "./components.css";

const ProfileProjects = ({
  userId,
  setGlobalError,
}: IProfileProjectsSectionProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, userId]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // const result = await projectService.getProjects({
      //   page,
      //   limit,
      //   sort: "desc",
      // });

      const result = await projectService.getProjects();
      console.log(result);

      setProjects(result.projects);
      setTotalProjects(result.total);
      setTotalPages(Math.ceil(result.total / limit));
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      const errorMessage = "Failed to load projects. Please try again later.";
      setError(errorMessage);
      setGlobalError(errorMessage);

      if (process.env.NODE_ENV !== "production") {
        setProjects(mockProjects);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      setError(null);
      await projectService.deleteProject(projectId);
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
      const errorMessage = "Failed to delete the project. Please try again.";
      setError(errorMessage);
    }
  };

  const handleCreateProject = () => {
    console.log("Create new project clicked");
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <div className="projects-section">
      <div className="projects-header">
        <Typography variant="h5" component="h2" className="section-title">
          My Projects
        </Typography>
        {/* <Button
          variant="contained"
          color="primary"
          className="new-project-button"
          onClick={handleCreateProject}
        >
          New Project
        </Button> */}
      </div>

      {loading && (
        <div className="loading-container">
          <Typography variant="body1" sx={{ mt: 2, color: "black" }}>
            Loading projects...
          </Typography>
          <CircularProgress />
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
                onChange={handlePageChange}
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
  );
};

export default ProfileProjects;
