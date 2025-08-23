import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { IProfileSidebarProps, ProjectDto } from "../../utils/types";
import { projectService } from "../../services/projectService";
import ProfileHeader from "./ProfileHeader";
import ProfileProjectsList from "./ProfileProjectsList";

const ProfileSidebar = ({
  userProfile,
  selectedProject,
  onProjectSelect,
}: IProfileSidebarProps) => {
  const [projects, setProjects] = useState<ProjectDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ProjectDto | null>(
    null
  );

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);

      const result = await projectService.getUserProjects(userProfile.id);
      setProjects(result.projects);

      if (result.projects.length > 0 && !selectedProject) {
        onProjectSelect(result.projects[0]);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  }, [userProfile.id, selectedProject, onProjectSelect]);

  const handleDeleteClick = useCallback(
    (event: React.MouseEvent, project: ProjectDto) => {
      event.stopPropagation();
      setProjectToDelete(project);
      setDeleteDialogOpen(true);
    },
    []
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!projectToDelete) return;

    try {
      await projectService.deleteProject(projectToDelete._id);

      setProjects(projects.filter((p) => p._id !== projectToDelete._id));

      if (selectedProject?._id === projectToDelete._id) {
        const remainingProjects = projects.filter(
          (p) => p._id !== projectToDelete._id
        );
        if (remainingProjects.length > 0) {
          onProjectSelect(remainingProjects[0]);
        } else {
          onProjectSelect(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  }, [projectToDelete, projects, selectedProject, onProjectSelect]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <Box
      sx={{
        width: 280,
        flexShrink: 0,
        bgcolor: "#F9F7FF",
        borderRight: "1px solid #E7E1F2",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
        zIndex: 10,
        boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
      }}
    >
      <ProfileHeader userProfile={userProfile} />
      <ProfileProjectsList
        projects={projects}
        loading={loading}
        selectedProject={selectedProject}
        onProjectSelect={onProjectSelect}
        handleDeleteClick={handleDeleteClick}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Project</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete project{" "}
            {projectToDelete?.url || projectToDelete?.name || "Unnamed Project"}
            ? This will permanently delete the project and all its analyses.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileSidebar;
