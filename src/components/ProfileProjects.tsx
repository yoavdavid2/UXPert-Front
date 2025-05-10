import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  CircularProgress,
  Pagination,
  Breadcrumbs,
  Link,
  Button,
  Dialog,
} from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import {
  IProfileProjectsSectionProps,
  userRequirmentsSummeryDto,
} from "../utils/types";
import { Project, mockProjects } from "../types/Project";
import { projectService } from "../services/projectService";
import "./components.css";
import StepperCard from "./stepper/StepperCard";
import { useNavigate } from "react-router-dom";
import { Transition } from "../pages/HomePage";

const ProfileProjects = ({
  userId,
  setGlobalError,
}: IProfileProjectsSectionProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [openNewProjectDialog, setOpenNewProjectDialog] = useState(false);
  const navigate = useNavigate();

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
    setOpenNewProjectDialog(true);
  };

  const handleCloseCard = (summary: userRequirmentsSummeryDto) => {
    setOpenNewProjectDialog(false);
    console.log(summary);
    navigate(`/results?link=${summary.url}`, { state: { summery: summary } });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="projects-section">
        <div className="projects-header">
          <Breadcrumbs aria-label="breadcrumb">
            <Button>
              <Typography variant="h5" component="h2" className="section-title">
                My Projects
              </Typography>
            </Button>
            {selectedProject && (
              <Typography variant="h6" sx={{ color: "text.primary" }}>
                {selectedProject.title}
              </Typography>
            )}
          </Breadcrumbs>
          <Button
            sx={{
              // mt: { xs: 2, sm: 4 },
              bgcolor: "#1a237e",
              color: "white",
              borderRadius: 2,
              px: { xs: 3, sm: 4, md: 5 },
              py: { xs: 1, sm: 1.5, md: 2 },
              textTransform: "none",
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              "&:hover": {
                bgcolor: "#0d1642",
              },
              alignSelf: "center",
            }}
            variant="contained"
            className="new-project-button"
            onClick={handleCreateProject}
          >
            New Project
          </Button>
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
      <Dialog
        open={openNewProjectDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseCard}
        aria-describedby="uxpert-card-dialog"
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            m: 2,
            maxHeight: "calc(100% - 64px)",
            overflow: "hidden",
          },
        }}
      >
        <StepperCard onClose={handleCloseCard} />
      </Dialog>
    </>
  );
};

export default ProfileProjects;
