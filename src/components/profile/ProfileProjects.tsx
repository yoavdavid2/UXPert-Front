import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  CircularProgress,
  Pagination,
  Breadcrumbs,
  Button,
  Dialog,
} from "@mui/material";

import ProjectCard from "./ProjectCard";
import ProjectResultCard from "./ProjectResultCard";
import StepperCard from "../stepper/StepperCard";
import { Transition } from "../../pages/HomePage";
import { projectService } from "../../services/projectService";
import {
  IProfileProjectsSectionProps,
  ProjectDto,
  userRequirmentsSummeryDto,
} from "../../utils/types";
import { Report } from "../../utils/ReportUtils";

import "../components.css";

const ProfileProjects = ({
  userId,
  setGlobalError,
}: IProfileProjectsSectionProps) => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectDto>();
  const [selectedProjectReports, setSelectedProjectReports] =
    useState<Report[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [openNewProjectDialog, setOpenNewProjectDialog] = useState(false);
  const navigate = useNavigate();

  const limit = 10;

  useEffect(() => {
    if (selectedProject) {
      fetchProjectResults();
    }
  }, [selectedProject]);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, userId]);

  const fetchProjectResults = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await projectService.getProjectsReports(
        selectedProject?.projectId || ""
      );
      setSelectedProjectReports(result.reports);
    } catch (err) {
      console.error("Failed to fetch project reports:", err);
      const errorMessage = "Failed to load projects. Please try again later.";
      setError(errorMessage);
      setGlobalError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await projectService.getUserProjects(userId);

      setProjects(result.projects);
      setTotalProjects(result.total);
      setTotalPages(Math.ceil(result.total / limit));
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      const errorMessage = "Failed to load projects. Please try again later.";
      setError(errorMessage);
      setGlobalError(errorMessage);
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

  const handleCloseCard = (summary: userRequirmentsSummeryDto | ProjectDto) => {
    setOpenNewProjectDialog(false);
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
            <Button onClick={() => setSelectedProject(undefined)}>
              <Typography variant="h5" component="h2" className="section-title">
                My Projects
              </Typography>
            </Button>
            {selectedProject && (
              <Typography variant="h6" sx={{ color: "text.primary" }}>
                {selectedProject.url}
              </Typography>
            )}
          </Breadcrumbs>
          <Button
            sx={{
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

        {!loading && (
          <>
            {selectedProject ? (
              <>
                {selectedProjectReports && selectedProjectReports.length > 0 ? (
                  <Grid
                    container
                    spacing={6}
                    className="projects-reports-grid"
                    mb={2}
                  >
                    {selectedProjectReports.map(
                      (selectedProjectReport: Report) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          key={selectedProjectReport._id}
                        >
                          <ProjectResultCard
                            report={selectedProjectReport}
                            onDelete={() =>
                              selectedProjectReport.projectId
                                ? handleDeleteProject(
                                    selectedProjectReport.projectId
                                  )
                                : null
                            }
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                ) : (
                  <div className="empty-projects">
                    <Typography variant="body1" color="text.secondary">
                      No reports available for this project.
                    </Typography>
                  </div>
                )}
              </>
            ) : (
              <>
                {projects.length > 0 && (
                  <>
                    <Grid container spacing={6} className="projects-grid">
                      {projects.map((project) => (
                        <Grid item xs={12} sm={6} key={project.projectId}>
                          <ProjectCard
                            project={project}
                            onClickProject={() => {
                              setSelectedProject(project);
                            }}
                            onDelete={() =>
                              project.projectId
                                ? handleDeleteProject(project.projectId)
                                : null
                            }
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
              </>
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
